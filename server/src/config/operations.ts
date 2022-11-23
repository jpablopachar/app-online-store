import { Db, Document, InsertManyResult, InsertOneResult, Sort } from 'mongodb'

export const assignDocumentId = async (db: Db, collection: string, sort: Sort = { registerDate: -1 }): Promise<string> => {
  const lastElement = await db
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray()

  if (lastElement.length === 0) return '1'

  return String(Number(lastElement[0].id) + 1)
}

export const findOneElement = async (db: Db, collection: string, filter: any): Promise<any> => {
  return db.collection(collection).findOne(filter)
}

export const insertOneElement = async (db: Db, collection: string, document: any): Promise<InsertOneResult<Document>> => {
  return await db.collection(collection).insertOne(document)
}

export const insertManyElement = async (db: Db, collection: string, documents: any): Promise<InsertManyResult<Document>> => {
  return await db.collection(collection).insertMany(documents)
}

export const findElements = async (db: Db, collection: string): Promise<any> => {
  return await db.collection(collection).find().toArray()
}
