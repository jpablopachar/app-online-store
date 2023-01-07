import { compareSync } from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken'
import {
  ACTIVE_VALUES_FILTER,
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
}

export default UsersService
