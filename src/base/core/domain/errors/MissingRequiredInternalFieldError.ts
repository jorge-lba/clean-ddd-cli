import { InternalDomainError } from './InternalDomainError';

export class MissingRequiredInternalFieldError extends InternalDomainError {
  constructor(props: MissingRequiredInternalFieldProps) {
    super({
      name: 'MissingRequiredInternalFieldError',
      message: `These internal fields are mandatory requirements: ${props.fields}`,
      context: props.context,
    });
  }
}

type MissingRequiredInternalFieldProps = {
  fields: string | string[];
  context: string;
};
