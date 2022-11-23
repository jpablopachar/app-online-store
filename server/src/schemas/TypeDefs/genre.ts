import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const GenreType = new GraphQLObjectType({
  name: 'Genre',
  description: 'Genre type',
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
