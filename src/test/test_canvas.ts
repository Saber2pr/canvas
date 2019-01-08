import { Canvas } from '../core/saber-canvas'
import { Node, Label } from '../core/Rect'

export function test_canvas() {
  let size = {
    width: 600,
    height: 600
  }

  new Canvas('test', size.width, size.height)
    .draw(new Node(size.width, size.height))
    .draw(new Label('hello canvas!'))
}
