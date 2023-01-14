import { DomainError } from './DomainError'

export class InvalidFieldTypeError extends DomainError {
  constructor (props: MissingRequiredFieldProps) {
    super({
      name: 'InvalidFieldType',
      message: `The type of ${props.field} is invalid. Instead, use ${props.correctType}.`,
      context: props.context
    })
  }
}

type MissingRequiredFieldProps = {
  field: string;
  correctType: string;
  context: string;
};
