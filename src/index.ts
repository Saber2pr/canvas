import { Canvas, Node, Label } from './lib/Canvas'

// import { randVec } from './lib/rand'
// import { call } from './lib/call'
// import { IMethod, IResult, mergeMat } from './lib/2048'
// import { Mat, MatSet, Mat_foreach } from './lib/Mat'
// import { Canvas, Label, vec2, Node } from './lib/Canvas'
// import { $ } from './lib/dom'

// let len = 4
// let size = 70
// let margin = size + 10

// let mat = new Mat(0, len)
// let canvas = new Canvas(400).drawLabel(new Label('2048').setPosition(170, 10))

// let mapVecToVector = (raw: number, col: number) =>
//   vec2(60 + 10 + raw * margin, 10 + col * margin + 60)

// mat.subscribe(arr => {
//   canvas.clear()
//   Mat_foreach<number>(arr, (value, raw, col) =>
//     canvas.drawLabel(
//       new Label(String(value))
//         .setPosition(mapVecToVector(raw, col))
//         .setColor('red')
//     )
//   )
// })

// let merge = (method: IMethod) =>
//   new Promise<IResult>(resolve =>
//     mat.pipe(
//       arr => call(() => MatSet(arr, 2, randVec(arr.length)), 2),
//       arr => {
//         let result = mergeMat(arr, method)
//         resolve(result)
//         return result.map
//       }
//     )
//   )

// let initButtons = (method: IMethod) =>
//   ($<HTMLButtonElement>(method).onclick = () => merge(method))

// initButtons('up')
// initButtons('down')
// initButtons('left')
// initButtons('right')

new Canvas('test', 300, 300)
  .setPosition(100)
  .draw(new Node(100).setPosition(40))
  .draw(new Label('2019'))
