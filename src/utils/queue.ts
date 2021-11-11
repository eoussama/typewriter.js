/**
 * @description
 * Queue utility
 */
export class Queue<T> {

  /**
   * @description
   * The queue's content
   */
  private items!: Array<T>;

  /**
   * @description
   * The number of items inside the queue
   */
  get length() { return this.items.length }

  enqueue() { }
  dequeue() { }
  isEmpty() { }
  peek() { }
}
