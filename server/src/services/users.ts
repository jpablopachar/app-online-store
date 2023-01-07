import { compareSync, hashSync } from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken'
import {
  ACTIVE_VALUES_FILTER,
  assignDocumentId,
  COLLECTIONS,
  EXPIRETIME,
  findOneElement,
  MESSAGES
} from '../config'
import { signJwt, verifyJwt } from '../libs'
import ResolversOperationsService from './resolvers-operations'

class UsersService extends ResolversOperationsService {
  private readonly _collection: COLLECTIONS = COLLECTIONS.USERS

  public async items (active: string = ACTIVE_VALUES_FILTER.ACTIVE): Promise<{
    info: {
      page: number
      pages: number
      itemsPage: number
      total: number
    } | null
    status: boolean
    message: string
    users: any
  }> {
    let filter: any = { active: { $ne: false } }

    if (active === ACTIVE_VALUES_FILTER.ALL) {
      filter = {}
    } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
      filter = { active: false }
    }

    const page = this.getVariables().pagination?.page
    const itemsPage = this.getVariables().pagination?.itemsPage
    const res = await this.list(
      this._collection,
      'usuarios',
      page,
      itemsPage,
      filter
    )

    return {
      info: res.info,
      status: res.status,
      message: res.message,
      users: res.items
    }
  }

  public async auth (): Promise<{
    status: boolean
    message: string
    user: any
  }> {
    const info: string | JwtPayload = await verifyJwt(this.getVariables().token)

    if (info === MESSAGES.TOKEN_VERICATION_FAILED) {
      return {
        status: false,
        message: info,
        user: null
      }
    }

    return {
      status: true,
      message: 'Usuario autenticado',
      user: Object.values(info)[0]
    }
  }

  public async login (): Promise<
  | {
    status: boolean
    message: string
    token: Promise<string> | null
    user: any
  }
  | {
    status: boolean
    message: string
    token: null
  }
  > {
    try {
      const variables: any = this.getVariables().user
      const user = await findOneElement(this.getDb(), this._collection, {
        email: variables.email
      })

      if (user === null) {
        return {
          status: false,
          message: 'El usuario no existe',
          token: null
        }
      }

      const passwordCheck: boolean = compareSync(
        variables?.password,
        user.password
      )

      if (passwordCheck !== null) {
        delete user.password
        delete user.birthday
        delete user.registerDate
      }

      return {
        status: passwordCheck,
        message: !passwordCheck
          ? 'Las credenciales son incorrectas'
          : 'Inicio de sesión satisfactorio',
        token: !passwordCheck ? null : signJwt({ user }, EXPIRETIME.H24),
        user: !passwordCheck ? null : user
      }
    } catch {
      return {
        status: false,
        message: 'Error al iniciar sesión',
        token: null
      }
    }
  }

  public async register (): Promise<{
    status: boolean
    message: string
    user: any
  }> {
    const user = this.getVariables().user

    if (user === null) {
      return {
        status: false,
        message: 'No se recibieron datos para el registro',
        user: null
      }
    }

    if (
      user?.password === null ||
      user?.password === undefined ||
      user?.password === ''
    ) {
      return {
        status: false,
        message: 'No se recibió la contraseña',
        user: null
      }
    }

    const userExists = await findOneElement(this.getDb(), this._collection, {
      email: user.email
    })

    if (userExists !== null) {
      return {
        status: false,
        message: 'El usuario ya existe',
        user: null
      }
    }

    user.id = await assignDocumentId(this.getDb(), this._collection, {
      registerDate: -1
    })
    user.registerDate = new Date().toISOString()
    user.password = hashSync(user.password, 10)

    const res = await this.add(this._collection, user || {}, 'usuario')

    return {
      status: res.status,
      message: res.message,
      user: res.item
    }
  }

  public async modify (): Promise<{
    status: boolean
    message: string
    user: any
  }> {
    const user = this.getVariables().user

    if (user === null) {
      return {
        status: false,
        message: 'No se recibieron datos para la actualización',
        user: null
      }
    }

    const filter = { id: user?.id }

    const res = await this.update(
      this._collection,
      filter,
      user || {},
      'usuario'
    )

    return {
      status: res.status,
      message: res.message,
      user: res.item
    }
  }

  public async delete (): Promise<
  | {
    status: boolean
    message: string
  }
  | {
    status: boolean
    message: string
    user: null
  }
  > {
    const id = this.getVariables().id

    if (id === undefined || id === '') {
      return {
        status: false,
        message: 'No se recibieron datos para eliminar el usuario',
        user: null
      }
    }

    const res = await this.remove(this._collection, { id }, 'usuario')

    return {
      status: res.status,
      message: res.message
    }
  }

  public async unblock (
    unblock: boolean,
    admin: boolean
  ): Promise<
    | {
      status: boolean
      message: string
    }
    | {
      status: boolean
      message: string
      genre: null
    }
    > {
    const id: string = String(this.getVariables().id) || ''
    const user = this.getVariables().user

    if (!this._checkData(id)) {
      return {
        status: false,
        message: 'No se recibió el id del usuario',
        genre: null
      }
    }

    if (user?.password === '1234') {
      return {
        status: false,
        message: 'La contraseña es incorrecta'
      }
    }

    let update: { active: boolean } = { active: unblock }

    if (unblock && !admin) {
      update = Object.assign(
        {},
        { active: true },
        { password: hashSync(user?.password, 10) }
      )
    }

    const res = await this.update(this._collection, { id }, update, 'usuario')

    const action: string = unblock ? 'Desbloqueado' : 'Bloqueado'

    return {
      status: res.status,
      message: res.status
        ? `Usuario ${action.toLowerCase()}`
        : `Error al ${action.toLocaleLowerCase()} el usuario`
    }
  }

  /* public async active () {
    const id = this.getVariables().user?.id
    const email = this.getVariables().user?.email || ''

    if (email === undefined || email === '') {
      return {
        status: false,
        message: 'No se recibió el correo electrónico'
      }
    }

    const token: string = await signJwt({ id, email }, EXPIRETIME.H1)
    const html = `Para activar la cuenta haz click sobre esto: <a href='${process.env.CLIENT_URL as string}/#/active/${token}'>Clic aquí</a>`
    const mail = {
      subject: 'Activar usuario',
      to: email,
      html
    }
  } */

  private _checkData (value: string): boolean {
    return value !== '' || value !== undefined
  }
}

export default UsersService
