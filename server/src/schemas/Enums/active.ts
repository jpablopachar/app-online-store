import { GraphQLEnumType } from 'graphql'

export const ActiveFilterEnum = new GraphQLEnumType({
  name: 'Active',
  values: {
    ALL: { value: 'ALL' },
    ACTIVE: { value: 'ACTIVE' },
    INACTIVE: { value: 'INACTIVE' }
  }
})
