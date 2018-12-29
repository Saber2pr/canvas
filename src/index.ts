import { randVec } from './lib/rand'
import { call } from './lib/call'
import { merge, mergeRight } from './lib/2048'
import { Observable } from './lib/Observable'
import { Mat } from './lib/Mat'

let lab = new Mat([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
console.log(lab.pull())
