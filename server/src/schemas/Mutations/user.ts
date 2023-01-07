import { GraphQLBoolean, GraphQLID, GraphQLNonNull } from 'graphql'
import UsersService from '../../services/users'
import { UserInputType } from '../Inputs'
import { ResultUser } from '../TypeDefs'

export const REGISTER = {
  type: ResultUser,
  args: {
    user: {
      type: new GraphQLNonNull(UserInputType),
      description: 'Información del usuario a registrar'
    }
  },
  async resolve (parent: any, { user }: any, context: any): Promise<any> {
    return await new UsersService(parent, { user }, context).register()
  },
  description: 'Permite registrar un nuevo usuario'
}

export const UPDATE_USER = {
  type: ResultUser,
  args: {
    user: {
      type: new GraphQLNonNull(UserInputType),
      description: 'Información del usuario a actualizar'
    }
  },
  async resolve (parent: any, { user }: any, context: any): Promise<any> {
    return await new UsersService(parent, { user }, context).modify()
  },
  description: 'Permite actualizar un usuario'
}

export const DELETE_USER = {
  type: ResultUser,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID), description: 'ID del usuario' }
  },
  async resolve (parent: any, { id }: any, context: any): Promise<any> {
    return await new UsersService(parent, { id }, context).delete()
  },
  description: 'Permite eliminar un usuario'
}

export const BLOCK_USER = {
  type: ResultUser,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID), description: 'ID del usuario' },
    unblock: { type: GraphQLBoolean, defaultValue: false, description: 'Bloquear o desbloquear el usuario' },
    admin: { type: GraphQLBoolean, defaultValue: false, description: 'Procedencia de la petición para modificar' }
  },
  async resolve (parent: any, { id, unblock, admin }: any, context: any): Promise<any> {
    return await new UsersService(parent, { id, unblock, admin }, context).unblock(unblock, admin)
  },
  description: 'Permite bloquear o desbloquear un usuario'
}
