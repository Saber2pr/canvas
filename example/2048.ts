/*
 * @Author: AK-12
 * @Date: 2019-01-01 19:53:34
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-03 11:04:03
 */
import { Mat, Mat_foreach, MatSet } from '../external/Mat'
import { Canvas } from '../lib/Canvas'
import { IMethod, IResult, mergeMat } from '../external/2048'
import { call } from '../external/call'
import { randVec } from '../external/rand'
import { $ } from '../external/dom'
import { Label, Node } from '../lib/Rect'

let len = 4
let size = 70
let margin = size + 10

let mat = new Mat(0, len)
let canvas = new Canvas('2048', 400, 400)

let drawBackground = () =>
  canvas
    .clear()
    .draw(new Node(400, 400))
    .draw(new Label('2048').setPosition(170, 10))
drawBackground()

let matRaw = raw => 60 + 10 + raw * margin
let matCol = col => 10 + col * margin + 60

mat.subscribe(arr => {
  drawBackground()
  Mat_foreach<number>(arr, (value, raw, col) =>
    canvas.draw(
      new Label(String(value))
        .setPosition(matRaw(raw), matCol(col))
        .setColor('red')
    )
  )
})

let merge = (method: IMethod) =>
  new Promise<IResult>(resolve =>
    mat.pipe(
      arr => call(() => MatSet(arr, 2, randVec(arr.length)), 2),
      arr => {
        let result = mergeMat(arr, method)
        resolve(result)
        return result.map
      }
    )
  )

let initButtons = (method: IMethod) =>
  ($<HTMLButtonElement>(method).onclick = () => merge(method))

initButtons('up')
initButtons('down')
initButtons('left')
initButtons('right')
