import { getRepository, Repository } from 'typeorm'

/**
 * the base class of all of the resolvers
 * @class
 */
export class BaseResolver<TModel> {
  /**
   * Create a list of resolvers using a list of ids
   * @param klass resolver class to be created
   * @param ids ids of the created instaces
   */
  public static fromIdList<T extends BaseResolver<any>>(
    klass: { new (id: number): T },
    ...ids: number[]
  ): T[] {
    return ids.map(id => new klass(id))
  }

  /**
   * Convert a list of entities to resolvers
   * @param klass resolver class to be created
   * @param entities entities of the created instance
   */
  public static fromList<
    TModel extends { id: number },
    TResolver extends BaseResolver<TModel>
  >(klass: { new (id: number): TResolver }, entities: TModel[]): TResolver[] {
    return entities.map(instance => {
      const resolver = new klass(instance.id)
      resolver.row = instance
      return resolver
    })
  }

  /** repository of the entity */
  protected repo: Repository<TModel>
  /** entity id of this instance */
  protected id: number
  /** entity instance */
  protected row: TModel
  [key: string]: any

  constructor(type: { new (): TModel }, id: number) {
    this.repo = getRepository(type)
    this.id = id
  }

  /**
   * Generate public fields for resolver
   * @param fields fields which should be public to graphql
   */
  protected publicFields<TModelField extends keyof TModel>(
    ...fields: TModelField[]
  ): void {
    fields.forEach(field => {
      this[field] = this.getField.bind(this, field)
    })
  }

  /**
   * Fetch one field of model
   * @param fieldName field to fetch
   */
  protected async getField<TModelField extends keyof TModel>(
    fieldName: TModelField
  ): Promise<TModel[TModelField]> {
    if (!this.row) {
      await this.getRow()
    }
    let value = this.row[fieldName]
    if ((value as any).then) {
      value = await this.row[fieldName]
    }
    return value
  }

  /**
   * Fetch model row by id
   */
  protected async getRow(): Promise<TModel> {
    return (this.row = await this.repo.findOneById(this.id))
  }
}
