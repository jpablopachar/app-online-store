import {
  GraphQLID, GraphQLNonNull, GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { RoleEnum } from '../Enums'

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Nombre de pila'
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Apellidos'
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Correo electrónico'
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Contraseña'
    },
    registerDate: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Fecha de registro'
    },
    birthday: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Fecha de nacimiento - Solo mayores de 18 años'
    },
    role: {
      type: new GraphQLNonNull(RoleEnum),
      description: 'Permisos del usuario'
    }
  })
})
