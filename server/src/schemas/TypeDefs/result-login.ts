import {
  GraphQLBoolean, GraphQLNonNull, GraphQLObjectType,
  GraphQLString
} from 'graphql'

export const ResultLogin = new GraphQLObjectType({
  name: 'ResultLogin',
  description: 'ResultLogin type',
  fields: () => ({
    status: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Estado de la operación'
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Mensaje de la operación'
    },
    token: {
      type: GraphQLString,
      description: 'Información del token del usuario logueado'
    }
  })
})
