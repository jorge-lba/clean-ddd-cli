import { randomUUID } from 'crypto'
import { BaseDates } from './types/base-dates.type'

const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity
}

abstract class Entity<Props> {
  protected readonly _id: string
  protected readonly _props: Props
  protected readonly _baseDates: BaseDates
  private readonly _errors: Map<string, Error> = new Map()

  constructor (props: Props, id?: string, baseDates?: BaseDates) {
    this._id = id || randomUUID()
    this._props = { ...props }
    this._baseDates = {
      createdAt: baseDates?.createdAt || new Date(),
      updatedAt: baseDates?.updatedAt || new Date(),
      deletedAt: baseDates?.deletedAt
    }
  }

  get id () {
    return this._id
  }

  get props () {
    return this._props
  }

  get errors () {
    return this._errors
  }

  get createdAt () {
    return this._baseDates.createdAt
  }

  get updatedAt () {
    return this._baseDates.updatedAt
  }

  get deletedAt () {
    return this._baseDates.deletedAt
  }

  get dates () {
    return {
      createdAt: this._baseDates.createdAt,
      updatedAt: this._baseDates.updatedAt,
      deletedAt: this._baseDates.deletedAt
    }
  }

  protected includeNewError (error: Error) {
    this._errors.set(randomUUID(), error)
  }

  static create (_props: unknown, _id?: string, _baseDates?: BaseDates): any {
    console.info(_props, _id, _baseDates)
    throw Error('Method not implemented')
  }

  public equals (object?: Entity<Props>): boolean {
    if (object == null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }

    return this._id === object._id
  }

  public isValid (): boolean {
    return this._errors.size === 0
  }
}

export { Entity }
