import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { REGISTER } from './Mutations'
import { LOGIN, ME, USERS } from './Queries'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: USERS,
    login: LOGIN,
    me: ME
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: REGISTER
  }
})

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema
