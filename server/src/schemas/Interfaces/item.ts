import {
  GraphQLID, GraphQLInterfaceType, GraphQLNonNull, GraphQLString
} from 'graphql'

export const ItemInterface = new GraphQLInterfaceType({
  name: 'Item',
  description: 'Item interface',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID del item'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nombre del item'
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Slug del item'
    }
  })
})
