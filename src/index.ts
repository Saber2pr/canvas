import { Lab } from './lib/lab'
import { randVec } from './lib/rand'
import { call } from './lib/call'
import { merge, mergeRight } from './lib/2048'

// let lab = new Lab(0, 3)

// call(() => lab.at(randVec(lab.cols), 2), 3)

// console.log(lab.cat())
// lab.setLab(merge(lab.cat(), 'down').map)
// console.log(lab.cat())
let lab = new Lab([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
console.log(lab.cat())
