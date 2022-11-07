import { compareSync } from 'bcrypt'
import { GraphQLNonNull, GraphQLString } from 'graphql'
import { COLLECTIONS, findElements, findOneElement, MESSAGES } from '../../config'
import { signJwt, verifyJwt } from '../../libs'
import { ResultLogin, ResultUser, ResultUsers } from '../TypeDefs'

export const USERS = {
  type: ResultUsers,
  async resolve (parent: any, { user }: any, { db }: any) {
    try {
      return {
        status: true,
        message: 'Lista de usuarios cargada correctamente',
        users: await findElements(db, COLLECTIONS.USERS)
      }
    } catch {
      return {
        status: false,
        message: 'Error al cargar la lista de usuarios',
        users: []
      }
    }
  }
}

export const LOGIN = {
  type: ResultLogin,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve (parent: any, { email, password }: any, { db }: any) {
    try {
      const user = await findOneElement(db, COLLECTIONS.USERS, { email })

      if (user === null) {
        return {
          status: false,
          message: 'El usuario no existe',
          token: null
        }
      }

      const passwordCheck = compareSync(password, user.password)

      if (passwordCheck !== null) {
        delete user.password
        delete user.birthday
        delete user.registerDate
      }

      return {
        status: true,
        message:
          !passwordCheck
            ? 'Las credenciales son incorrectas'
            : 'Inicio de sesión satisfactorio',
        token: !passwordCheck ? null : signJwt({ user })
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

export const ME = {
  type: ResultUser,
  async resolve (parent: any, args: any, { token }: any) {
    const info = await verifyJwt(token)

    if (info === MESSAGES.TOKEN_VERICATION_FAILED) {
      return {
        status: false,
        message: info,
        user: null
      }
    }

    return {
      status: true,
      message: 'Usuario cargado correctamente',
      user: Object.values(info)[0]
    }
  }
}
