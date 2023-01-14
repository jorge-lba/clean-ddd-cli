import { randomUUID } from 'crypto';
import { BaseDates } from './types/base-dates.type';

export abstract class ValueObject<T> {
  private readonly _id: string | null;
  private readonly _props: T;
  protected readonly _baseDates: BaseDates;

  constructor(props: T, id?: string | null, baseDates?: BaseDates) {
    if (id === null) {
      this._id = null;
    } else {
      this._id = id || randomUUID();
    }

    this._baseDates = {
      createdAt: baseDates?.createdAt || new Date(),
      updatedAt: baseDates?.updatedAt || new Date(),
      deletedAt: baseDates?.deletedAt,
    };

    this._props = Object.freeze({ ...props });
  }

  get id() {
    return this._id;
  }

  get props() {
    return { ...this._props };
  }

  get dates() {
    return { ...this._baseDates };
  }

  public equals(vo: ValueObject<any>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.props === undefined) {
      return false;
    }

    return Object.entries(this.props as any)
      .filter(
        ([key]) =>
          key !== 'id' &&
          key !== 'createdAt' &&
          key !== 'updatedAt' &&
          key !== 'deletedAt',
      )
      .map(([key, value]) => vo.props[key] === value)
      .reduce((current, next) => current && next, true);
  }

  public delete() {
    this._baseDates.deletedAt = new Date();
  }
}
