import { randomUUID } from 'crypto';

export abstract class InternalDomainError extends Error {
  private _id: string;
  private _context: string;
  private _date: Date;
  private _message: string;
  private _name: string;

  constructor(props: InternalDomainErrorProps) {
    super(props.message);
    this._id = randomUUID();
    this._name = this.constructor.name;
    this._message = props.message;
    this._context = props.context;
    this._date = new Date();
  }

  get id() {
    return this._id;
  }

  get context() {
    return this._context;
  }

  get date() {
    return this._date;
  }

  get name() {
    return this._name;
  }

  get message() {
    return this._message;
  }

  get values() {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      context: this.context,
      date: this.date,
    };
  }
}

export interface InternalDomainErrorProps {
  name: string;
  message: string;
  context: string;
}
