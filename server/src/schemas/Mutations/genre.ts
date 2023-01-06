import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql'
import { GenresService } from '../../services'
import { ResultGenre } from '../TypeDefs'

export const ADD_GENRE = {
  type: ResultGenre,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    genre: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve (parent: any, args: any, context: any): Promise<any> {
    return await new GenresService(parent, args, context).insert()
  }
}

export const UPDATE_GENRE = {
  type: ResultGenre,
  args: {
    genre: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve (parent: any, args: any, context: any): Promise<any> {
    return await new GenresService(parent, args, context).insert()
  }
}
