/*
 * @Author: AK-12
 * @Date: 2018-12-28 20:09:54
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-28 21:25:04
 */
/**
 * call
 *
 * @export
 * @template T
 * @param {(count: number) => T} func
 * @param {number} [times=1]
 * @returns
 */
export function call<T>(func: (count: number) => T, times: number = 1) {
  let count = 0
  let result: T
  let loop = (): T => {
    if (count >= times) {
      return result
    }
    count++
    result = func(count)
    loop()
    return result
  }
  return loop()
}
