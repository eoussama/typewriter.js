import { Func } from "../types/function.type.js";

/**
 * @description
 * Observable definition
 */
export class Observable<T> {

  /**
   * @description
   * The list of subscribers
   */
  private readonly subscribers!: Array<Func<T>>;

  /**
   * @description
   * The emitted value
   */
  private value!: T;

  /**
   * @description
   * Instanciates an observable instance
   */
  constructor(defaultValue: T) {

    // Initializing the default value
    this.value = defaultValue;

    // Initializing the subscribers list
    this.subscribers = [];
  }

  /**
   * @description
   * Emits an event for all listening subscribers
   *
   * @param e The emitted value
   */
  emit(e: T): void {
    this.subscribers.forEach((subscriber: Func<T>) => {
      this.value = e;
      subscriber(this.value);
    })
  }

  /**
   * @description
   * Registers a new subscriber
   *
   * @param func The target function
   */
  subscribe(func: Func<T>): void {
    this.subscribers.push(func);
    func(this.value);
  }
}
