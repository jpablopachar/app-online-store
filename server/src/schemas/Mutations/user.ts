import { hashSync } from 'bcrypt'
import { GraphQLNonNull } from 'graphql'
import { Db } from 'mongodb'
import { COLLECTIONS } from '../../config'
import { UserInputType } from '../Inputs'
import { ResultUser } from '../TypeDefs'

export const REGISTER = {
  type: ResultUser,
  args: {
    user: { type: new GraphQLNonNull(UserInputType) }
  },
  async resolve (parent: any, { user }: any, { db }: any): Promise<any> {
    const userExists = await (db as Db).collection(COLLECTIONS.USERS).findOne({ email: user.email })

    if (userExists !== null) {
      return {
        status: false,
        message: 'El usuario ya existe',
        user: null
      }
    }

    const lastUser = await (db as Db)
      .collection(COLLECTIONS.USERS)
      .find()
      .limit(1)
      .sort({ registerDate: -1 })
      .toArray()

    user.id = lastUser.length === 0 ? 1 : Number(lastUser[0].id) + 1
    user.registerDate = new Date().toISOString()
    user.password = hashSync(user.password, 10)

    try {
      await (db as Db).collection(COLLECTIONS.USERS).insertOne(user)

      return {
        status: true,
        message: 'Usuario registrado correctamente',
        user
      }
    } catch {
      return {
        status: false,
        message: 'Se ha producido un error al registrar el usuario',
        user: null
      }
    }
  }
}
