import { Nullable } from './../types/nullable.type';

/**
 * @description
 * Queue utility
 */
export default class Queue<T> {

  /**
   * @description
   * The queue's content
   */
  private _items!: Array<T>;

  /**
   * @description
   * The number of items inside the queue
   */
  get length() { return this._items.length };

  /**
   * @description
   * Initializes the queue object
   */
  constructor() {
    this._items = [];
  }

  /**
   * @description
   * Queues the target item in
   *
   * @param item The target iteme
   */
  enqueue(item: T): void {
    this._items.push(item);
  }

  /**
   * @description
   * Dequeues the first item
   */
  dequeue(): Nullable<T> {
    return this._items.shift() ?? null;
  }

  /**
   * @description
   * Checks if the list is empty
   */
  isEmpty(): boolean {
    return this._items.length === 0;
  }

  /**
   * @description
   * Returns the first item n the queue
   */
  peek(): T {
    return this._items[0];
  }

  /**
   * @description
   * Clears the queue
   */
  clear(): void {
    this._items = [];
  }
}
