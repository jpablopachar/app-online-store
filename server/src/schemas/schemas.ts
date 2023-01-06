import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { ADD_GENRE, BLOCK_GENRE, DELETE_GENRE, REGISTER, UPDATE_GENRE } from './Mutations'
import { GENRE, GENRES, LOGIN, ME, USERS } from './Queries'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    users: USERS,
    login: LOGIN,
    me: ME,
    genre: GENRE,
    genres: GENRES
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: REGISTER,
    addGenre: ADD_GENRE,
    updateGenre: UPDATE_GENRE,
    deleteGenre: DELETE_GENRE,
    blockGenre: BLOCK_GENRE
  }
})

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema
