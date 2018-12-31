import { randVec } from './lib/rand'
import { call } from './lib/call'
import { IMethod, IResult, mergeMat } from './lib/2048'
import { Mat, MatSet } from './lib/Mat'
import { Canvas, Block, Label } from './lib/Canvas'

let mat = new Mat(0, 3)

mat.subscribe(arr => console.log(arr))

let createNew = arr => call(() => MatSet(arr, 2, randVec(arr.length)), 2)

let merge = (method: IMethod) =>
  new Promise<IResult>(resolve => {
    mat.pipe(
      createNew,
      arr => {
        let result = mergeMat(arr, method)
        resolve(result)
        return result.map
      }
    )
  })

merge('up').then(res => console.log(res.delta))

let canvas = new Canvas(400)

let block1 = new Block(100).setPosition(0)
let block2 = new Block(100).setPosition(100)
let block3 = new Block(100).setPosition(200)
let label = new Label(200, 100, 48, 'hello')
canvas.clearAll().drawLabel(label)
