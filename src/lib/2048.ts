/*
 * @Author: AK-12
 * @Date: 2018-12-27 22:36:53
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-12-27 22:36:53
 */
export let mergeLeft = (arr: number[]) => {
  let i, nextI, m
  let len = arr.length
  let score
  let delta = Array(arr.length).fill(0)
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
    arr: arr,
    delta: delta,
    score: score
  }
}

export let mergeRight = (arr: number[]) => {
  let res = mergeLeft([...arr].reverse())
  return {
    arr: [...res.arr].reverse(),
    delta: [...res.delta].reverse(),
    score: res.score
  }
}
