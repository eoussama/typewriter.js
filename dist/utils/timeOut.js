/**
 * @description
 * Timesout the current thread
 *
 * @param time The time in milliseconds
 * @returns
 */
export default function timeOut(time) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
