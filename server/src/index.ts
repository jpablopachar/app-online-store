import { ApolloServer } from 'apollo-server-express'
import { config } from 'dotenv'
import { Db } from 'mongodb'
import { app, dbConnection } from './config'
import { IContext } from './models'
import { schema } from './schemas'

config()
// dbConnection()

const PORT = process.env.PORT ?? 3000

const main = async (): Promise<void> => {
  const db = await dbConnection()

  try {
    const context = async ({ req, connection }: IContext): Promise<{ db: Db, token: any }> => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      const token = req ? req.headers.authorization : connection.authorization

      return { db, token }
    }

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
