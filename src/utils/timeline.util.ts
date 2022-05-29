import Tick from '../models/tick.model.js';
import Keys from '../types/keys.type.js';

/**
 * @util
 * @description
 * Collection of ticks that manages execution context 
 * and chronological order
 */
export default class Timeline {

  /**
   * @description
   * List of ticks
   */
  ticks: Array<Tick>;

  /**
   * @description
   * Current tick Position marker
   */
  private cursor: number;

  /**
   * @description
   * Creates a timeline instance
   */
  constructor() {
    this.cursor = 0;
    this.ticks = [new Tick()];
  }

  /**
   * @description
   * Updates timeline ticks
   *
   * @param tick Tick info
   */
  public update(tick: Keys<Tick>) {
    this.ticks.push(new Tick(tick));
    this.cursor++;
  }

  /**
   * @description
   * Returns the current active tick
   */
  public getTick() {
    return { ...this.ticks[this.cursor] };
  }
}
