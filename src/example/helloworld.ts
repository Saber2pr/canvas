/*
 * @Author: AK-12
 * @Date: 2019-01-01 19:53:40
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-01 23:16:37
 */
import { Label, Node, Canvas, Sprite } from '../lib/Canvas'

new Canvas('hello', 640, 480)
  .draw(new Node(640, 480))
  .draw(new Label('hello world!').setPosition(300, 20))
  .draw(new Node(100, 200).setColor('blue').setPosition(200, 200))
  .draw(
    new Sprite(100, 100).setSrc(
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1383897413,2145010163&fm=26&gp=0.jpg'
    )
  )
