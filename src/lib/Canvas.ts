/*
 * @Author: AK-12
 * @Date: 2018-12-29 23:10:57
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-01 18:27:17
 */
/**
 * IRectProps
 *
 * @interface IProps
 */
interface IRectProps {
  w: number
  h: number
  color: string
}
/**
 * INodeProps
 *
 * @interface
 */
interface INodeProps extends IRectProps {
  x: number
  y: number
}
/**
 * ICanvasProps
 *
 * @interface ICanvasProps
 * @extends {INodeProps}
 */
interface ICanvasProps extends INodeProps {
  ctx: CanvasRenderingContext2D
}
/**
 * ILabelProps
 *
 * @interface ILabelProps
 * @extends {}
 */
interface ILabelProps extends INodeProps {
  text: string
  fontSize: number
  fontStyle: string
}
/**
 * Rules
 */
namespace Rules {
  /**
   * isLabel
   * @param obj
   */
  export const isLabelArray = (obj: any): obj is Label[] =>
    typeof (obj as Label[])[0]['text'] !== 'undefined'
  /**
   * isCanvas
   * @param obj
   */
  export const isCanvas = (obj: any): obj is HTMLCanvasElement =>
    typeof (obj as HTMLCanvasElement)['getContext'] !== 'undefined'
  /**
   * isCtx
   * @param obj
   */
  export const isCtx = (obj: any): obj is CanvasRenderingContext2D =>
    typeof (obj as CanvasRenderingContext2D)['canvas'] !== 'undefined'
}
/**
 * Rect
 *
 * @class Rect
 * @implements {IRectProps}
 */
export class Rect implements IRectProps {
  w: number
  h: number
  color: string
  /**
   *Creates an instance of Rect.
   * @param {number} w
   * @param {number} h
   * @param {string} color
   * @memberof Rect
   */
  constructor(w: number, h: number) {
    this.color = '#3a32af'
    this.w = w
    this.h = h
  }
  /**
   * setSize
   *
   * @param {number} w
   * @param {number} h
   * @returns
   * @memberof Node
   */
  public setSize(w: number, h: number) {
    this.w = w
    this.h = h
    return this
  }
  /**
   * setColor
   *
   * @param {string} color
   * @returns
   * @memberof Block
   */
  public setColor(color: string) {
    this.color = color
    return this
  }
}
/**
 * Block
 *
 * @export
 * @class Block
 */
export class Node extends Rect implements INodeProps {
  x: number
  y: number
  /**
   *Creates an instance of Node.
   * @param {number} w
   * @param {number} h
   * @param {string} color
   * @memberof Node
   */
  constructor(w: number, h: number) {
    super(w, h)
    this.x = 0
    this.y = 0
  }
  /**
   * setPosition
   *
   * @param {number} x
   * @param {number} y
   * @returns
   * @memberof Node
   */
  public setPosition(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }
}
/**
 * Canvas
 *
 * @export
 * @class Canvas
 */
export class Canvas extends Node implements ICanvasProps {
  ctx: CanvasRenderingContext2D
  /**
   *Creates an instance of Canvas.
   * @param {string} elementId
   * @param {number} MaxWidth
   * @param {number} MaxHeight
   * @memberof Canvas
   */
  constructor(elementId: string, MaxWidth: number, MaxHeight: number) {
    super(MaxWidth, MaxHeight)
    let canvas = document.getElementById(elementId)
    if (Rules.isCanvas(canvas)) {
      canvas.width = MaxWidth
      canvas.height = MaxHeight
      let ctx = canvas.getContext('2d')
      if (Rules.isCtx(ctx)) {
        this.ctx = ctx
      }
    } else {
      throw 'cannot get canvas element by id: ' + elementId
    }
  }
  /**
   * clear
   *
   * @memberof Canvas
   */
  public clear(): this
  /**
   * clear
   *
   * @param {Node} x
   * @returns {Canvas}
   * @memberof Canvas
   */
  public clear(node: Node): this
  public clear(node?: Node) {
    if (node) {
      node.setColor(this.color)
      this.draw(node)
      return this
    }
    this.draw(this)
    return this
  }
  /**
   * clearAll
   *
   * @memberof Canvas
   */
  public destroy() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    return this
  }
  /**
   * fillNode
   *
   * @private
   * @param {INodeProps} props
   * @memberof Canvas
   */
  private fillNode(props: INodeProps) {
    let { x, y, w, h, color } = props
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
    return this
  }
  /**
   * fillLabel
   *
   * @private
   * @param {ILabelProps} props
   * @memberof Canvas
   */
  private fillLabel(props: ILabelProps) {
    let { x, y, h, color, fontSize, fontStyle, text } = props
    this.ctx.font = String(fontSize) + 'px' + ' ' + fontStyle
    this.ctx.strokeStyle = color
    this.ctx.strokeText(text, x, y + h)
    return this
  }
  /**
   * draw
   *
   * @param {...Node[]} node
   * @returns {this}
   * @memberof Canvas
   */
  public draw(...node: Node[]): this
  /**
   * draw
   *
   * @param {...Label[]} node
   * @returns {this}
   * @memberof Canvas
   */
  public draw(...node: Label[]): this
  public draw(...node: Node[] | Label[]) {
    this.ctx.canvas.style.marginLeft = String(this.x) + 'px'
    this.ctx.canvas.style.marginTop = String(this.y) + 'px'
    if (Rules.isLabelArray(node)) {
      node.forEach(l => this.fillLabel(l))
      return this
    }
    node.forEach(n => this.fillNode(n))
    return this
  }
}
/**
 * Label
 *
 * @export
 * @class Label
 * @extends {Node}
 */
export class Label extends Node implements ILabelProps {
  fontSize: number
  fontStyle: string
  text: string
  /**
   *Creates an instance of Label.
   * @param {number} w
   * @param {number} h
   * @param {number} fontSize
   * @param {string} text
   * @memberof Label
   */
  constructor(text: string, fontSize: number = 23) {
    super(text.length * fontSize, fontSize)
    this.fontStyle = 'serif'
    this.color = '563a6d'
    this.text = text
    this.fontSize = fontSize
  }
  /**
   * setFontSize
   *
   * @param {number} fontSize
   * @memberof Label
   */
  public setFontSize(fontSize: number) {
    this.fontSize = fontSize
    this.setSize(this.text.length * fontSize, fontSize)
    return this
  }
  /**
   * setFontStyle
   *
   * @param {string} fontStyle
   * @returns
   * @memberof Label
   */
  public setFontStyle(fontStyle: string) {
    this.fontStyle = fontStyle
    return this
  }
  /**
   * setText
   *
   * @param {string} text
   * @memberof Label
   */
  public setText(text: string) {
    this.text = text
    return this
  }
}
