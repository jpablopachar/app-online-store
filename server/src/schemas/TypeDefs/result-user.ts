import {
  GraphQLBoolean, GraphQLNonNull, GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { UserType } from './user'

export const ResultUser = new GraphQLObjectType({
  name: 'ResultUser',
  description: 'ResultUser type',
  fields: () => ({
    status: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Estado de la operación'
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Mensaje de la operación'
    },
    user: {
      type: UserType,
      description: 'Información del usuario'
    }
  })
})
