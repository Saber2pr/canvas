// interface ArrAndDelta {
//   arr: number[]
//   delta: number[]
// }

// let mergeLeft = (arr: number[]): ArrAndDelta => {
//   let i, nextI, m
//   let len = arr.length
//   let delta = fillArray(0, arr.length)
//   for (i = 0; i < len; i++) {
//     nextI = -1
//     for (m = i + 1; m < len; m++) {
//       if (arr[m] !== 0) {
//         nextI = m
//         if (arr[i] === arr[m]) {
//           delta[m] = m - i
//         } else {
//           if (arr[i] === 0) {
//             delta[m] = m - i
//           } else {
//             delta[m] = m - i - 1
//           }
//         }
//         break
//       }
//     }
//     if (nextI !== -1) {
//       if (arr[i] === 0) {
//         arr[i] = arr[nextI]
//         arr[nextI] = 0
//         i -= 1
//       } else if (arr[i] === arr[nextI]) {
//         arr[i] = arr[i] * 2
//         this.updateTimes =
//           arr[i] < this.maxValue
//             ? this.updateTimes + arr[i]
//             : this.updateTimes + 1
//         arr[nextI] = 0
//       }
//     }
//   }
//   return {
//     arr: arr,
//     delta: delta
//   }
// }