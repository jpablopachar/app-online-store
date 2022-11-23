import { GraphQLID, GraphQLNonNull } from 'graphql'
import { GenresService } from '../../services'
import { ResultGenre } from '../TypeDefs'

export const GENRES = {
  type: ResultGenre,
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
  }
}

export const GENRE = {
  type: ResultGenre,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  async resolve (
    parent: any,
    { id }: any,
    { db }: any
  ) {
    return await new GenresService(parent, { id }, { db }).details()
  }
}
