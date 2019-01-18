import { Canvas } from '../core/saber-canvas'
import { Node, Label, Sprite } from '../core/Rect'

export function test_canvas() {
  let size = {
    width: 600,
    height: 600
  }

  let res = new Canvas('test', size.width, size.height)
    .draw(new Node(size.width, size.height))
    .draw(new Label('hello canvas!'))
    .draw(
      new Sprite(
        'https://ubmcmm.baidustatic.com/media/v1/0f000F_LSh3bh3jmLIlBv6.png'
      )
        .setSize(100, 100)
        .setPosition(100, 100)
    )
    .getImageData(150, 150, 10, 10).data
  console.log(res)
}
