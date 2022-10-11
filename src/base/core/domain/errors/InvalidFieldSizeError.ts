import { DomainError } from './DomainError';

export class InvalidFieldSizeError extends DomainError {
  constructor(props: InvalidFieldSizeErrorProps) {
    super({
      name: 'InvalidFieldSizeError',
      message: `The maximum size of the ${props.field} field is ${props.maxSize}`,
      context: props.context,
    });
  }
}

type InvalidFieldSizeErrorProps = {
  field: string;
  maxSize: string;
  context: string;
};
