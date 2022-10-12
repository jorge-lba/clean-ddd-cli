import { DomainError } from './DomainError';

export class MissingRequiredFieldError extends DomainError {
  constructor(props: MissingRequiredFieldProps) {
    super({
      name: 'MissingRequiredField',
      message: `Some fields were not provided: ${props.fields}`,
      context: props.context,
    });
  }
}

type MissingRequiredFieldProps = {
  fields: string | string[];
  context: string;
};
