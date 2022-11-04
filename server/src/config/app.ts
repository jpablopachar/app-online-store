import compression from 'compression'
import cors from 'cors'
import express from 'express'
// import { graphqlHTTP } from 'express-graphql'
import morgan from 'morgan'
// import { schema } from '../schemas'

const app = express()

app.use(cors())
app.use(compression())
// app.use('', graphqlHTTP({ schema, graphiql: true }))
// app.use('/graphql', graphqlHTTP({ schema: schemas, graphiql: true }))
app.use(morgan('dev'))

export default app
