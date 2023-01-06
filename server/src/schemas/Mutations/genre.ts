import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import { GenresService } from '../../services'
import { ResultGenre } from '../TypeDefs'

export const ADD_GENRE = {
  type: ResultGenre,
  args: {
    genre: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nombre del género'
    }
  },
  async resolve (parent: any, args: any, context: any): Promise<any> {
    return await new GenresService(parent, args, context).insert()
  },
  description: 'Permite añadir un nuevo género'
}

export const UPDATE_GENRE = {
  type: ResultGenre,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID), description: 'ID del género' },
    genre: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nombre del género'
    }
  },
  async resolve (parent: any, args: any, context: any): Promise<any> {
    return await new GenresService(parent, args, context).modify()
  },
  description: 'Actualiza la información de un género con respecto a su ID'
}

export const DELETE_GENRE = {
  type: ResultGenre,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID), description: 'ID del género' }
  },
  async resolve (parent: any, args: any, context: any): Promise<any> {
    return await new GenresService(parent, args, context).delete()
  },
  description: 'Permite eliminar un género'
}

export const BLOCK_GENRE = {
  type: ResultGenre,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID), description: 'ID del género' },
    unblock: { type: GraphQLBoolean, defaultValue: false, description: 'Bloquear o desbloquear el género' }
  },
  async resolve (parent: any, args: any, context: any): Promise<any> {
    return await new GenresService(parent, args, context).unblock()
  },
  description: 'Permite bloquear o desbloquear un género para no utilizarlo'
}
