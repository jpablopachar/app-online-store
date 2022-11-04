import { ApolloServer } from 'apollo-server-express'
import { config } from 'dotenv'
import { app, dbConnection } from './config'
import { schema } from './schemas'

config()
// dbConnection()

const PORT = process.env.PORT ?? 3000

const main = async (): Promise<void> => {
  const db = await dbConnection()

  try {
    const context = { db }
    const server = new ApolloServer({
      schema,
      introspection: true,
      context
    })

    await server.start()

    server.applyMiddleware({ app })
    app.listen(PORT)

    console.log(`Servidor en puerto: ${PORT}`)
  } catch (error) {
    console.error(error)
  }
}

main()
