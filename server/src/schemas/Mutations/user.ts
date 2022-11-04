import { GraphQLNonNull } from 'graphql'
import { UserInputType } from '../Inputs'
import { UserType } from '../TypeDefs'

export const REGISTER = {
  type: UserType,
  args: {
    user: { type: new GraphQLNonNull(UserInputType) }
  },
  async resolve (parent: any, { user }: any, db: any): Promise<never[]> {
    console.log('Llega aquí')
    console.log(parent)
    console.log(user)
    console.log(db)

    return []
  }
}
