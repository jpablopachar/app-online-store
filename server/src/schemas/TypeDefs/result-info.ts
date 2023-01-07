import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql'

export const ResultInfo = new GraphQLObjectType({
  name: 'ResultInfo',
  description: 'ResultInfo type',
  fields: () => ({
    page: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Página seleccionada'
    },
    total: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Número total de documentos'
    },
    itemsPage: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Número de documentos por página'
    },
    pages: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Páginas que contiene el resultado'
    }
  })
})
