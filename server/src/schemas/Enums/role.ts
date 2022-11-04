import { GraphQLEnumType } from 'graphql'

export const RoleEnum = new GraphQLEnumType({
  name: 'Role',
  values: {
    ADMIN: { value: 'ADMIN' },
    CLIENT: { value: 'CLIENT' }
  }
})
