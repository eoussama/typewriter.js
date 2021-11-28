/**
 * @description
 * Timesout the current thread
 *
 * @param time The time in milliseconds
 * @returns 
 */
export default function timeOut(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
