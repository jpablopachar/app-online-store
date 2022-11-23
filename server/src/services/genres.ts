import slugify from 'slugify'
import { assignDocumentId, COLLECTIONS, findOneElement } from '../config'
import ResolversOperationsService from './resolvers-operations'

class GenresService extends ResolversOperationsService {
  private readonly _collection: COLLECTIONS = COLLECTIONS.GENRES

  public async items (): Promise<{
    status: boolean
    message: string
    genres: any
  }> {
    const res: { status: boolean, message: string, items: any } =
      await this.list(this._collection, 'géneros')

    return {
      status: res.status,
      message: res.message,
      genres: res.items
    }
  }

  public async details (): Promise<{
    status: boolean
    message: string
    genre: any
  }> {
    const res: { status: boolean, message: string, item: any } =
      await this.get(this._collection)

    return {
      status: res.status,
      message: res.message,
      genre: res.item
    }
  }

  public async insert (): Promise<{
    status: boolean
    message: string
    genre: any
  }> {
    const genre: string = String(this.getVariables().genre)

    if (this.checkData(genre)) {
      return {
        status: false,
        message: 'El género no se ha establecido',
        genre: null
      }
    }

    const genreTemp = await this.checkInDatabase(genre)

    if (genreTemp !== null) {
      return {
        status: false,
        message: 'El género ya existe',
        genre: null
      }
    }

    const genreObj = {
      id: await assignDocumentId(this.getDb(), this._collection, { id: -1 }),
      name: genre,
      slug: slugify(genre, { lower: true })
    }

    const res = await this.add(this._collection, genreObj, 'género')

    return {
      status: res.status,
      message: res.message,
      genre: res.item
    }
  }

  private checkData (value: string): boolean {
    return value === '' || value === undefined
  }

  private async checkInDatabase (value: string): Promise<any> {
    return await findOneElement(this.getDb(), this._collection, { name: value })
  }
}

export default GenresService
