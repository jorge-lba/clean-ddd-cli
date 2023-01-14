import { IUseCaseEvent } from './use-case-events.interface';

export class UseCaseEvents {
  private static handlersMap: { [key: string]: any } = {};

  public static register(
    callback: (event: IUseCaseEvent) => void,
    eventClassName: string,
  ): void {
    if (
      !Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  private static logUseCaseEventDispatch(useCaseEvent: IUseCaseEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const useCaseEventClass = Reflect.getPrototypeOf(useCaseEvent);
    console.info(
      '[UseCase Event Dispatched]:',
      thisClass?.constructor.name,
      '==>',
      useCaseEventClass?.constructor.name,
    );
  }

  static dispatch(event: IUseCaseEvent): void {
    const eventClassName: string = event.constructor.name;

    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }

    this.logUseCaseEventDispatch(event);
  }

  static async dispatchAsync(event: IUseCaseEvent): Promise<any> {
    const eventClassName: string = event.constructor.name;
    const responses: Array<Promise<any>> = [];

    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        responses.push(handler(event));
      }
    }

    this.logUseCaseEventDispatch(event);
    const result = await Promise.all(responses);
    return result;
  }
}
