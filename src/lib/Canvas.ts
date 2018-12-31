/*
 * @Author: AK-12
 * @Date: 2018-12-29 23:10:57
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-30 21:30:01
 */
/**
 * IBaseProps
 *
 * @interface IProps
 */
interface IBaseProps {
  w: number
  h: number
  color: string
}
/**
 *
 *
 * @interface
 */
interface INodeProps extends IBaseProps {
  x: number
  y: number
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
 * Canvas
 *
 * @export
 * @class Canvas
 */
export class Canvas {
  private ctx: CanvasRenderingContext2D
  protected w: number
  protected h: number
  protected color: string
  /**
   *Creates an instance of Canvas.
   * @param {number} w
   * @memberof Canvas
   */
  constructor(w: number)
  /**
   *Creates an instance of Canvas.
   * @param {number} w
   * @param {number} h
   * @memberof Canvas
   */
  constructor(w: number, h: number)
  /**
   *Creates an instance of Canvas.
   * @param {number} w
   * @param {number} h
   * @param {string} color
   * @memberof Canvas
   */
  constructor(w: number, h: number, color: string)
  constructor(w: number, h?: number, color?: string) {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement
    if (!canvas) {
      canvas = document.getElementsByTagName('canvas')[0]
      if (!canvas) {
        canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
      }
    }
    canvas.width = w
    canvas.height = h || w
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    if (ctx) {
      this.ctx = ctx
      this.w = canvas.width
      this.h = canvas.height
      this.color = color || '#639181'
      this.resetCtx()
    } else {
      throw 'cannot get canvas context: ' + canvas
    }
  }
  /**
   * resetCtx
   *
   * @private
   * @memberof Canvas
   */
  private resetCtx() {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(0, 0, this.w, this.h)
    return this
  }
  /**
   * clear
   *
   * @memberof Canvas
   */
  public clear(): Canvas
  /**
   * clear
   *
   * @param {Node} x
   * @returns {Canvas}
   * @memberof Canvas
   */
  public clear(node: Node): Canvas
  public clear(node?: Node) {
    if (node) {
      node.setColor(this.color)
      this.drawNode(node)
      return this
    }
    this.resetCtx()
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
  }
  /**
   * drawBlock
   *
   * @param {...Node[]} node
   * @returns
   * @memberof Canvas
   */
  public drawNode(...node: Node[]) {
    node.forEach(n => this.fillNode(n.getProps()))
    return this
  }
  /**
   *
   *
   * @memberof Canvas
   */
  public drawLabel(...label: Label[]) {
    label.forEach(l => this.fillLabel(l.getProps()))
    return this
  }
}
/**
 * Block
 *
 * @export
 * @class Block
 */
export class Node {
  protected x: number
  protected y: number
  protected w: number
  protected h: number
  protected color: string
  /**
   *Creates an instance of Block.
   * @param {number} w
   * @memberof Block
   */
  constructor(w: number)
  /**
   *Creates an instance of Block.
   * @param {number} w
   * @param {number} h
   * @memberof Block
   */
  constructor(w: number, h: number)
  /**
   *Creates an instance of Node.
   * @param {number} w
   * @param {number} h
   * @param {string} color
   * @memberof Node
   */
  constructor(w: number, h: number, color: string)
  constructor(w: number, h?: number, color?: string) {
    this.x = 0
    this.y = 0
    this.w = w
    this.h = h || w
    this.color = color || '#3a32af'
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
  /**
   * setSize
   *
   * @param {number} w
   * @memberof Block
   */
  public setSize(w: number)
  /**
   * setSize
   *
   * @param {number} w
   * @param {number} h
   * @memberof Block
   */
  public setSize(w: number, h: number)
  public setSize(w: number, h?: number) {
    this.w = w
    this.h = h || w
    return this
  }
  /**
   * setPosition
   *
   * @param {number} x
   * @memberof Block
   */
  public setPosition(x: number): Node
  /**
   * setPosition
   *
   * @param {number} x
   * @param {number} y
   * @memberof Block
   */
  public setPosition(x: number, y: number): Node
  public setPosition(x: number, y?: number) {
    this.x = x
    this.y = y || x
    return this
  }
  /**
   * getProps
   *
   * @returns
   * @memberof Block
   */
  public getProps(): INodeProps {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      color: this.color
    }
  }
}
/**
 * Label
 *
 * @export
 * @class Label
 * @extends {Node}
 */
export class Label extends Node {
  protected fontSize: number
  protected fontStyle: string
  protected text: string
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
    this.text = text
    this.fontSize = fontSize
    this.fontStyle = 'serif'
  }
  /**
   * setFontSize
   *
   * @param {number} fontSize
   * @memberof Label
   */
  public setFontSize(fontSize: number) {
    this.fontSize = fontSize
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
  /**
   * getProps
   *
   * @returns {ILabelProps}
   * @memberof Label
   */
  public getProps(): ILabelProps {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      color: this.color,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      text: this.text
    }
  }
}
