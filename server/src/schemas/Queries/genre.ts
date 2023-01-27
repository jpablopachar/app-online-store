import { GraphQLID, GraphQLInt, GraphQLNonNull } from 'graphql'
import { GenresService } from '../../services'
import { ActiveFilterEnum } from '../Enums'
import { ResultGenre } from '../TypeDefs'

export const GENRES = {
  type: ResultGenre,
  args: {
    page: {
      type: GraphQLInt,
      default: 1,
      description: 'Página seleccionada'
    },
    itemsPage: {
      type: GraphQLInt,
      default: 20,
      description: 'Cantidad de géneros de los juegos por página'
    },
    active: {
      type: ActiveFilterEnum,
      default: 'ACTIVE',
      description: 'Estado del género'
    }
  },
  async resolve (
    parent: any,
    args: any,
    { db }: any
  ): Promise<{
      status: boolean
      message: string
      genres: any
    }> {
    return await new GenresService(parent, args, { db }).items()
  },
  description: 'Permite listar los géneros de los juegos'
}

export const GENRE = {
  type: ResultGenre,
  args: { id: { type: new GraphQLNonNull(GraphQLID), description: 'Id del género del juego' } },
  async resolve (
    parent: any,
    { id }: any,
    { db }: any
  ) {
    return await new GenresService(parent, { id }, { db }).details()
  },
  description: 'Permite obtener el género de un juego'
}
