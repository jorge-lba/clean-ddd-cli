import { DomainError } from './DomainError';

export class StringShouldContainOnlyLettersError extends DomainError {
  constructor(props: StringShouldContainOnlyLettersProps) {
    super({
      name: 'StringShouldContainOnlyLetters',
      message: `The ${props.fieldName} field must contain only letters.`,
      context: props.context,
    });
  }
}

type StringShouldContainOnlyLettersProps = {
  context: string;
  fieldName: string;
};
