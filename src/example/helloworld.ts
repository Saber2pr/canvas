/*
 * @Author: AK-12
 * @Date: 2019-01-01 19:53:40
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-01 20:01:35
 */
import { Label, Node, Canvas } from '../lib/Canvas'

new Canvas('hello', 640, 480)
  .draw(new Node(640, 480))
  .draw(new Label('hello world!').setPosition(300, 20))
  .draw(new Node(100, 200).setColor('blue').setPosition(200, 200))
