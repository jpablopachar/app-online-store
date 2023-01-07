import {
  Db,
  DeleteResult,
  Document,
  InsertManyResult,
  InsertOneResult,
  Sort,
  UpdateResult
} from 'mongodb'
import { Pagination } from '../models'

export const assignDocumentId = async (
  db: Db,
  collection: string,
  sort: Sort = { registerDate: -1 }
): Promise<string> => {
  const lastElement = await db
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray()

  if (lastElement.length === 0) return '1'

  return String(Number(lastElement[0].id) + 1)
}

export const findElements = async (
  db: Db,
  collection: string,
  filter: any = {},
  pagination: Pagination = {
    page: 1,
    pages: 1,
    itemsPage: -1,
    skip: 0,
    total: -1
  }
): Promise<any> => {
  if (pagination.total === -1) {
    return await db.collection(collection).find(filter).toArray()
  }

  return await db
    .collection(collection)
    .find(filter)
    .limit(pagination.itemsPage)
    .skip(pagination.skip)
    .toArray()
}

export const findOneElement = async (
  db: Db,
  collection: string,
  filter: any
): Promise<any> => {
  return db.collection(collection).findOne(filter)
}

export const insertOneElement = async (
  db: Db,
  collection: string,
  document: any
): Promise<InsertOneResult<Document>> => {
  return await db.collection(collection).insertOne(document)
}

export const insertManyElement = async (
  db: Db,
  collection: string,
  documents: any
): Promise<InsertManyResult<Document>> => {
  return await db.collection(collection).insertMany(documents)
}

export const updateOneElement = async (
  db: Db,
  collection: string,
  filter: any,
  updateObject: any
): Promise<UpdateResult> => {
  return await db
    .collection(collection)
    .updateOne(filter, { $set: updateObject })
}

export const deleteOneElement = async (
  db: Db,
  collection: string,
  filter: any
): Promise<DeleteResult> => {
  return await db.collection(collection).deleteOne(filter)
}

export const countElements = async (
  db: Db,
  collection: string,
  filter: any
): Promise<number> => {
  return await db.collection(collection).find(filter).count()
}

export const randomItems = async (
  db: Db,
  collection: string,
  filter: any,
  items: number = 10
): Promise<Document[]> => {
  // eslint-disable-next-line @typescript-eslint/return-await, no-async-promise-executor
  return new Promise(async (resolve): Promise<void> => {
    const pipeline = [{ $match: filter }, { $sample: { size: items } }]

    resolve(await db.collection(collection).aggregate(pipeline).toArray())
  })
}

export const manageStockUpdate = async (
  db: Db,
  collection: string,
  filter: any,
  updateObject: any
): Promise<UpdateResult> => {
  return await db
    .collection(collection)
    .updateOne(filter, { $inc: updateObject })
}
