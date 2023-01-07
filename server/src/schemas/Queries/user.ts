import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql'
import UsersService from '../../services/users'
import { ActiveFilterEnum } from '../Enums'
import { ResultLogin, ResultUser, ResultUsers } from '../TypeDefs'

export const USERS = {
  type: ResultUsers,
  args: {
    page: {
      type: GraphQLInt,
      default: 1,
      description: 'Página seleccionada'
    },
    itemsPage: {
      type: GraphQLInt,
      default: 20,
      description: 'Cantidad de usuarios por página'
    },
    active: {
      type: ActiveFilterEnum,
      default: 'ACTIVE',
      description: 'Estado del usuario'
    }
  },
  async resolve (parent: any, { page, itemsPage, active }: any, context: any) {
    return await new UsersService(parent, { pagination: { page, itemsPage } }, context).items(active)
  },
  description: 'Permite listar los usuarios'
}

export const LOGIN = {
  type: ResultLogin,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString), description: 'Email del usuario' },
    password: { type: new GraphQLNonNull(GraphQLString), description: 'Contraseña del usuario' }
  },
  async resolve (parent: any, { email, password }: any, context: any) {
    return await new UsersService(parent, { email, password }, context).login()
  },
  description: 'Permite iniciar la sesión de un usuario'
}

export const ME = {
  type: ResultUser,
  async resolve (parent: any, args: any, { token }: any) {
    return await new UsersService(parent, args, { token }).auth()
  },
  description: 'Permite autenticarse mediante un token'
}
