/*
 * @Author: AK-12
 * @Date: 2018-12-29 23:10:57
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-01 19:40:39
 */
/**
 * @interface IRectProps
 */
export interface IRectProps {
  x: number
  y: number
  w: number
  h: number
}
/**
 * @interface IRect
 * @extends {IRectProps}
 */
export interface IRect extends IRectProps {
  setPosition(x: number, y: number): this
  setSize(w: number, h: number): this
}
/**
 * @interface INodeProps
 * @extends {IRectProps}
 */
export interface INodeProps extends IRectProps {
  color: string
}
/**
 * @interface INode
 * @extends {INodeProps}
 */
export interface INode extends INodeProps {
  setColor(color: string): this
}
/**
 * @interface ILabelProps
 * @extends {INodeProps}
 */
export interface ILabelProps extends INodeProps {
  text: string
  fontSize: number
  fontStyle: string
}
/**
 * @interface ILabel
 * @extends {ILabelProps}
 */
export interface ILabel extends ILabelProps {
  setText(text: string): this
  setFontSize(fontSize: number): this
  setFontStyle(fontStyle: string): this
}
/**
 * @interface ICanvas
 * @extends {ICanvasProps}
 */
export interface ICanvas {
  clear(): this
  clear(rect: IRectProps): this
  draw(...node: INodeProps[]): this
  draw(...node: ILabelProps[]): this
}
/**
 * Rules
 */
export namespace Rules {
  /**
   * isLabelPropsArray
   * @param obj
   */
  export const isLabelPropsArray = (obj: any): obj is ILabelProps[] =>
    typeof (obj as ILabelProps[])[0]['text'] !== 'undefined'
  /**
   * isNodePropsArray
   * @param obj
   */
  export const isNodePropsArray = (obj: any): obj is INodeProps[] =>
    typeof (obj as INodeProps[])[0]['x'] !== 'undefined'
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
 * @export
 * @class Rect
 * @implements {IRect}
 */
export class Rect implements IRect {
  x: number
  y: number
  w: number
  h: number
  /**
   *Creates an instance of Rect.
   * @param {number} w
   * @param {number} h
   * @memberof Rect
   */
  constructor(w: number, h: number) {
    this.x = 0
    this.y = 0
    this.w = w
    this.h = h
  }
  /**
   * @param {number} x
   * @param {number} y
   * @returns
   * @memberof Rect
   */
  public setPosition(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }
  /**
   * @param {number} w
   * @param {number} h
   * @returns
   * @memberof Rect
   */
  public setSize(w: number, h: number) {
    this.w = w
    this.h = h
    return this
  }
}
/**
 * @export
 * @class Node
 * @extends {Rect}
 * @implements {INode}
 */
export class Node extends Rect implements INode {
  color: string
  /**
   *Creates an instance of Node.
   * @param {number} w
   * @param {number} h
   * @memberof Node
   */
  constructor(w: number, h: number) {
    super(w, h)
    this.color = '#3a32af'
  }
  /**
   * @param {string} color
   * @returns
   * @memberof Node
   */
  public setColor(color: string) {
    this.color = color
    return this
  }
}
/**
 * @export
 * @class Label
 * @extends {Node}
 * @implements {ILabel}
 */
export class Label extends Node implements ILabel {
  fontSize: number
  fontStyle: string
  text: string
  /**
   *Creates an instance of Label.
   * @param {string} text
   * @param {number} [fontSize=23]
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
   * @param {number} fontSize
   * @returns
   * @memberof Label
   */
  public setFontSize(fontSize: number) {
    this.fontSize = fontSize
    this.setSize(this.text.length * fontSize, fontSize)
    return this
  }
  /**
   * @param {string} fontStyle
   * @returns
   * @memberof Label
   */
  public setFontStyle(fontStyle: string) {
    this.fontStyle = fontStyle
    return this
  }
  /**
   * @param {string} text
   * @returns
   * @memberof Label
   */
  public setText(text: string) {
    this.text = text
    return this
  }
}
/**
 * @export
 * @class Canvas
 * @extends {Node}
 * @implements {ICanvas}
 */
export class Canvas implements ICanvas {
  /**
   * @private
   * @type {CanvasRenderingContext2D}
   * @memberof Canvas
   */
  private ctx: CanvasRenderingContext2D
  /**
   *Creates an instance of Canvas.
   * @param {string} elementId
   * @param {number} MaxWidth
   * @param {number} MaxHeight
   * @memberof Canvas
   */
  constructor(elementId: string, MaxWidth: number, MaxHeight: number) {
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
   * @returns {this}
   * @memberof Canvas
   */
  public clear(): this
  /**
   * @param {IRectProps} rect
   * @returns {this}
   * @memberof Canvas
   */
  public clear(rect: IRectProps): this
  public clear(rect?: IRectProps) {
    if (rect) {
      let { x, y, w, h } = rect
      this.ctx.clearRect(x, y, w, h)
      return this
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    return this
  }
  /**
   * @private
   * @param {INodeProps} props
   * @returns
   * @memberof Canvas
   */
  private fillNode(props: INodeProps) {
    let { x, y, w, h, color } = props
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
    return this
  }
  /**
   * @private
   * @param {ILabelProps} props
   * @returns
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
   * @param {...INodeProps[]} node
   * @returns {this}
   * @memberof Canvas
   */
  public draw(...node: INodeProps[]): this
  /**
   * @param {...ILabelProps[]} node
   * @returns {this}
   * @memberof Canvas
   */
  public draw(...node: ILabelProps[]): this
  public draw(...node: INodeProps[] | ILabelProps[]) {
    if (node.length > 0) {
      if (Rules.isLabelPropsArray(node)) {
        node.forEach(l => this.fillLabel(l))
        return this
      }
      if (Rules.isNodePropsArray(node)) {
        node.forEach(n => this.fillNode(n))
        return this
      }
      return this
    }
    return this
  }
}
