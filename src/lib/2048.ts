import { labTransform } from './lab'

/*
 * @Author: AK-12
 * @Date: 2018-12-27 22:36:53
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-28 21:27:54
 */
/**
 * Method
 *
 * @interface Method
 */
interface Method {
  (arr: number[]): {
    arr: number[]
    delta: number[]
    score: number
  }
}
/**
 * mergeLeft
 * @param arr
 */
export let mergeLeft: Method = arr => {
  let i, nextI, m
  let len = arr.length
  let score = 0
  let delta: number[] = new Array(arr.length).fill(0)
  for (i = 0; i < len; i++) {
    nextI = -1
    for (m = i + 1; m < len; m++) {
      if (arr[m] !== 0) {
        nextI = m
        if (arr[i] === arr[m]) {
          delta[m] = m - i
        } else {
          if (arr[i] === 0) {
            delta[m] = m - i
          } else {
            delta[m] = m - i - 1
          }
        }
        break
      }
    }
    if (nextI !== -1) {
      if (arr[i] === 0) {
        arr[i] = arr[nextI]
        arr[nextI] = 0
        i -= 1
      } else if (arr[i] === arr[nextI]) {
        arr[i] = arr[i] * 2
        score = arr[i] < 2048 ? arr[i] : -1
        arr[nextI] = 0
      }
    }
  }
  return {
    arr,
    delta,
    score
  }
}
/**
 * mergeRight
 * @param arr
 */
export let mergeRight: Method = arr => {
  let res = mergeLeft([...arr].reverse())
  return {
    arr: [...res.arr].reverse(),
    delta: [...res.delta].reverse(),
    score: res.score
  }
}
/**
 * mergeSuper
 * @param arr
 * @param method
 */
export let mergeSuper = (arr: number[][], method: Method) => {
  let score = 0
  let map = new Array<Array<number>>()
  let delta = new Array<Array<number>>()
  arr.forEach(raw => {
    let res = method(raw)
    score += res.score
    map.push(res.arr)
    delta.push(res.delta)
  })
  return {
    map,
    delta,
    score
  }
}
/**
 * @interface ILabMerge
 */
interface ILabMerge {
  (lab: number[][], method: 'left' | 'right' | 'up' | 'down'): {
    map: number[][]
    delta: number[][]
    score: number
  }
}
/**
 * merge
 * @param lab
 * @param method 'left' | 'right' | 'up' | 'down'
 */
export let merge: ILabMerge = (lab, method) => {
  switch (method) {
    case 'left':
      return mergeSuper(lab, mergeLeft)
    case 'right':
      return mergeSuper(lab, mergeRight)
    case 'up':
      let res_up = mergeSuper(labTransform(lab), mergeLeft)
      return {
        map: labTransform(res_up.map),
        delta: labTransform(res_up.delta),
        score: res_up.score
      }
    case 'down':
      let res_down = mergeSuper(labTransform(lab), mergeRight)
      return {
        map: labTransform(res_down.map),
        delta: labTransform(res_down.delta),
        score: res_down.score
      }
    default:
      throw 'merge method error: ' + method
  }
}
