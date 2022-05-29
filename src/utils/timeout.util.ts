/**
 * @util
 * @description
 * Timesout the current thread
 *
 * @param time The time in milliseconds
 */
export default function timeout(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
