import { compareSync } from 'bcrypt'
import { GraphQLNonNull, GraphQLString } from 'graphql'
import { Db } from 'mongodb'
import { COLLECTIONS } from '../../config'
import { signJwt } from '../../libs'
import { ResultLogin, ResultUsers } from '../TypeDefs'

export const USERS = {
  type: ResultUsers,
  async resolve (parent: any, { user }: any, { db }: any) {
    try {
      return {
        status: true,
        message: 'Lista de usuarios cargada correctamente',
        users: await (db as Db).collection(COLLECTIONS.USERS).find().toArray()
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
      const user = await (db as Db)
        .collection(COLLECTIONS.USERS)
        .findOne({ email })

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
