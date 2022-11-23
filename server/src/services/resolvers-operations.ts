import { Db, InsertOneResult } from 'mongodb'
import { findElements, findOneElement, insertOneElement } from '../config'
import { IContextData } from '../models'

class ResolversOperationsService {
  private readonly _parent: any
  private readonly _args: any
  private readonly _context: IContextData

  constructor (parent: any, args: any, context: IContextData) {
    this._parent = parent
    this._args = args
    this._context = context
  }

  protected getDb (): Db { return this._context.db as Db }

  protected getVariables (): any { return this._args }

  protected async list (collection: string, listElement: string): Promise<{ status: boolean, message: string, items: any }> {
    try {
      return {
        status: true,
        message: `Lista de ${listElement} cargada correctamente`,
        items: await findElements(this._context.db as Db, collection)
      }
    } catch (error) {
      return {
        status: false,
        message: `Error al cargar la lista de ${listElement}`,
        items: []
      }
    }
  }

  protected async get (collection: string): Promise<{ status: boolean, message: string, item: any }> {
    const collectionTemp: string = collection.toLowerCase()

    try {
      const res = await findOneElement(this._context.db as Db, collection, { id: this._args.id })

      if (res !== null) {
        return {
          status: true,
          message: `${collectionTemp} cargado correctamente`,
          item: res
        }
      }

      return {
        status: true,
        message: `${collectionTemp} no encontrado`,
        item: null
      }
    } catch (error) {
      return {
        status: false,
        message: `Se ha producido un error al cargar ${collectionTemp}`,
        item: null
      }
    }
  }

  protected async add (collection: string, document: any, item: string): Promise<{
    status: boolean
    message: string
    item: any
  }> {
    try {
      const res: InsertOneResult<Document> = await insertOneElement(this._context.db as Db, collection, document)

      console.log(res)

      if (res.acknowledged) {
        return {
          status: true,
          message: `${item} añadido correctamente`,
          item: document
        }
      }

      return {
        status: false,
        message: `${item} no se ha insertado correctamente`,
        item: null
      }
    } catch {
      return {
        status: false,
        message: `Se ha producido un error al insertar ${item}`,
        item: null
      }
    }
  }
}

export default ResolversOperationsService