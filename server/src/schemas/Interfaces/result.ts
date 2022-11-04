import {
  GraphQLBoolean, GraphQLInterfaceType, GraphQLNonNull, GraphQLString
} from 'graphql'

export const ResultInterface = new GraphQLInterfaceType({
  name: 'Result',
  description: 'Result interface',
  fields: () => ({
    status: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Estado de la operación'
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Mensaje de la operación'
    }
  })
})
