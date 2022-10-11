export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): string;
}
