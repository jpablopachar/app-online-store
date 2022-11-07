import { hashSync } from 'bcrypt'
import { GraphQLNonNull } from 'graphql'
import { assignDocumentId, COLLECTIONS, findOneElement, insertOneElement } from '../../config'
import { UserInputType } from '../Inputs'
import { ResultUser } from '../TypeDefs'

export const REGISTER = {
  type: ResultUser,
  args: {
    user: { type: new GraphQLNonNull(UserInputType) }
  },
  async resolve (parent: any, { user }: any, { db }: any): Promise<any> {
    const userExists = await findOneElement(db, COLLECTIONS.USERS, { email: user.email })

    if (userExists !== null) {
      return {
        status: false,
        message: 'El usuario ya existe',
        user: null
      }
    }

    user.id = await assignDocumentId(db, COLLECTIONS.USERS, { registerDate: -1 })
    user.registerDate = new Date().toISOString()
    user.password = hashSync(user.password, 10)

    try {
      await insertOneElement(db, COLLECTIONS.USERS, user)

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
