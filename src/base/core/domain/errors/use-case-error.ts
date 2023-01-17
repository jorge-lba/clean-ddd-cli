import { DomainError } from './domain-error';

export abstract class UseCaseError extends Error {
  private _name: string;

  constructor(errors: string | DomainError[]) {
    const message = Array.isArray(errors)
      ? UseCaseError.makeMessage(errors)
      : errors;
    super(message);
    this._name = this.constructor.name;

    // console.error(errors)
  }

  get name() {
    return this._name;
  }

  static makeMessage(errors: DomainError[]): string {
    const messages = errors.map((error) => error.message).join('\n');

    return `\n ${messages}`;
  }
}
