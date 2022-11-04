import {
  GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { UserType } from './user'

export const ResultUsers = new GraphQLObjectType({
  name: 'ResultUsers',
  description: 'ResultUsers type',
  fields: () => ({
    status: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Estado de la operación'
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Mensaje de la operación'
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      description: 'Lista de usuarios registrados en la base de datos'
    }
  })
})
