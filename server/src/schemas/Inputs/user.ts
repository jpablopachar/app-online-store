import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { RoleEnum } from '../Enums'

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Input para añadir los datos del usuario en el registro',
  fields: () => ({
    id: { type: GraphQLID, description: 'ID del usuario no obligatorio' },
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
    birthday: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Fecha de nacimiento - Solo mayores de 18 años'
    },
    role: {
      type: RoleEnum,
      description: 'Permisos del usuario no obligatorio',
      defaultValue: 'CLIENT'
    }
  })
})
