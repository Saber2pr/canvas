import { labReset, labFill } from './lib/lab'
import { mergeLeft, mergeRight } from './lib/2048'
import { rand } from './lib/rand'

let test = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]

let test3 = [2, 2, 4, 2]

// console.log(labReset(test))

// console.log(mergeRight(test3))

let len = 4

let size = { x: len, y: len }

let lab = labFill(0, size)

let x = rand(len)
let y = rand(len)

test[x][y] = 233
lab[x][y] = 233

console.log(test)
console.log(lab)
console.error({ x, y })
