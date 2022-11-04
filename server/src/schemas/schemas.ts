import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { REGISTER } from './Mutations'
import { USERS } from './Queries'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: USERS
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
