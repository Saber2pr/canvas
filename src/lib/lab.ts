/*
 * @Author: AK-12
 * @Date: 2018-12-27 21:54:43
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-27 22:20:45
 */
export let labReset = <T>(arr: T[][]) =>
  arr[0].map((col, i) => arr.map(row => row[i]))

export let labFill = <T>(value: T, size: { x: number; y: number }) =>
  Array(size.y).fill(Array(size.x).fill(value))
