import {
  GraphQLList
} from 'graphql'
import { UserType } from '../TypeDefs'

export const USERS = { type: new GraphQLList(UserType), resolve: () => [] }
