import { Db, MongoClient } from 'mongodb'

const dbConnection = async (): Promise<Db> => {
  const client = new MongoClient(process.env.MONGODB as string)

  try {
    await client.connect()

    const db = client.db()

    console.log(`Base de datos conectado en: ${db.databaseName}`)

    return db
  } catch (error) {
    console.log('Error de conexión: ', error)

    process.exit(1)
  }
}

export default dbConnection
