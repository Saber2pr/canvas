/*
 * @Author: AK-12
 * @Date: 2019-01-01 19:53:40
 * @Last Modified by:   AK-12
 * @Last Modified time: 2019-01-01 19:53:40
 */
import { Label, Node, Canvas } from '../lib/Canvas'

let title = new Label('hello world').setPosition(170, 10)
let background = new Node(640, 480)
let block = new Node(60, 100).setColor('green').setPosition(200, 100)

new Canvas('hello', 500, 500).draw(background, block).draw(title)
