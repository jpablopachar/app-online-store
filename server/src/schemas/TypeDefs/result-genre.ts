import {
  GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { GenreType } from './genre'
import { ResultInfo } from './result-info'

export const ResultGenre = new GraphQLObjectType({
  name: 'ResultGenre',
  description: 'ResultGenre type',
  fields: () => ({
    info: {
      type: ResultInfo,
      description: 'Muestra la información del sistema de paginación'
    },
    status: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Estado de la operación'
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Mensaje de la operación'
    },
    genre: {
      type: GenreType,
      description: 'Género registrado en la base de datos'
    },
    genres: {
      type: new GraphQLList(new GraphQLNonNull(GenreType)),
      description: 'Lista de géneros registrados en la base de datos'
    }
  })
})
