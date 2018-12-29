import { randVec } from './lib/rand'
import { call } from './lib/call'
import { merge, mergeRight } from './lib/2048'
import { Observable } from './lib/Observable'
import { Mat, MatSet } from './lib/Mat'

let mat = new Mat(0, 3)

mat.subscribe(arr => console.log(arr))

let createNew = arr => call(() => MatSet(arr, 2, randVec(arr.length)), 2)
let merge_left_map = arr => merge(arr, 'left').map

mat.pipe(
  createNew,
  merge_left_map
)
