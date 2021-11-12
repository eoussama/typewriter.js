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

  /**
   * @description
   * Queues the target item in
   *
   * @param item The target iteme
   */
  enqueue(item: T): void {
    this.items.push(item);
  }

  /**
   * @description
   * Dequeues the first item
   */
  dequeue(): T { 
    return this.items.shift();
  }

  /**
   * @description
   * Checks if the list is empty
   */
  isEmpty(): boolean { 
    return this.items.length === 0;
  }

  /**
   * @description
   * Returns the first item n the queue
   */
  peek(): T { 
    return this.items[0];
  }
}
