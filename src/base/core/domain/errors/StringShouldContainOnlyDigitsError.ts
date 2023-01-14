import { DomainError } from './DomainError'

export class StringShouldContainOnlyDigitsError extends DomainError {
  constructor (props: StringShouldContainOnlyDigitsProps) {
    super({
      name: 'StringShouldContainOnlyDigitsError',
      message: `The ${props.fieldName} field must contain digits only.`,
      context: props.context
    })
  }
}

type StringShouldContainOnlyDigitsProps = {
  context: string;
  fieldName: string;
};
