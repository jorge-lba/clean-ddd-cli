import { IDomainEvent } from './domain-events.interface'
import { Aggregate } from '../aggregate'

export class DomainEvents {
  private static handlersMap: {[key: string]: any} = {}
  private static markedAggregates: Aggregate<any>[] = []

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch (aggregate: Aggregate<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents (aggregate: Aggregate<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event)
    )
  }

  private static removeAggregateFromMarkedDispatchList (
    aggregate: Aggregate<any>
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))
    this.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID (id: string): Aggregate<any> {
    let found: Aggregate<any> | null = null
    for (const aggregate of this.markedAggregates) {
      if (aggregate.id === id) {
        found = aggregate
      }
    }

    if (!found) throw new Error('Marked Aggregate not found.')

    return found
  }

  public static dispatchEventsForAggregate (id: string): void {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register (
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
      this.handlersMap[eventClassName] = []
    }
    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers (): void {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates (): void {
    this.markedAggregates = []
  }

  private static dispatch (event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name

    if (Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName]
      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
