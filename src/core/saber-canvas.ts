/*
 * @Author: AK-12
 * @Date: 2018-12-29 23:10:57
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-18 21:48:21
 */
/**
 * @export
 * @interface IBase
 */
export interface IBase {
  /**
   * Don't change this value, unless you know what you are doing.
   *
   * @type {('Rect' | 'Node' | 'Label')}
   * @memberof IBase
   */
  type: 'Rect' | 'Node' | 'Label' | 'Sprite'
}
/**
 * @export
 * @interface IRectProps
 * @extends {IBase}
 */
export interface IRectProps extends IBase {
  x: number
  y: number
  w: number
  h: number
}
/**
 * @export
 * @interface INodeProps
 * @extends {IRectProps}
 */
export interface INodeProps extends IRectProps {
  color: string
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
 * @export
 * @interface ISpriteProps
 * @extends {IRectProps}
 */
export interface ISpriteProps extends IRectProps {
  img: HTMLImageElement
}
/**
 * Rules
 */
export namespace Rules {
  /**
   * @param obj
   */
  export const isLabel = (obj: Object): obj is ILabelProps =>
    (obj as ILabelProps)['type'] === 'Label'
  /**
   * @param obj
   */
  export const isLabelPropsArray = (obj: Object[]): obj is ILabelProps[] =>
    isLabel(obj[0])
  /**
   * @param obj
   */
  export const isNode = (obj: Object): obj is INodeProps =>
    (obj as INodeProps)['type'] === 'Node'
  /**
   * @param obj
   */
  export const isNodePropsArray = (obj: Object[]): obj is INodeProps[] =>
    isNode(obj[0])
  /**
   * @param obj
   */
  export const isSprite = (obj: any): obj is ISpriteProps =>
    (obj as ISpriteProps)['type'] === 'Sprite'
  /**
   * @param obj
   */
  export const isSpritePropsArray = (obj: Object[]): obj is ISpriteProps[] =>
    isSprite(obj[0])
  /**
   * @param obj
   */
  export const isCanvas = (obj: any): obj is HTMLCanvasElement =>
    typeof (obj as HTMLCanvasElement)['getContext'] !== 'undefined'
  /**
   * @param obj
   */
  export const isCtx = (obj: any): obj is CanvasRenderingContext2D =>
    typeof (obj as CanvasRenderingContext2D)['canvas'] !== 'undefined'
}
/**
 * @export
 * @interface ICanvas
 * @extends {ICanvasProps}
 */
export interface ICanvas {
  clear(): this
  clear(rect: IRectProps): this
  draw(...node: INodeProps[]): this
  draw(...label: ILabelProps[]): this
  draw(...sprite: ISpriteProps[]): this
  getImageData(sx: number, sy: number, sw: number, sh: number): ImageData
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
    if (canvas) {
      if (Rules.isCanvas(canvas)) {
        canvas.width = MaxWidth
        canvas.height = MaxHeight
        let ctx = canvas.getContext('2d')
        if (Rules.isCtx(ctx)) {
          this.ctx = ctx
        }
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
   * @memberof Canvas
   */
  private fillNode(props: INodeProps) {
    let { x, y, w, h, color } = props
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
  }
  /**
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
   * @private
   * @param {ISpriteProps} props
   * @returns
   * @memberof Canvas
   */
  private fillImage(props: ISpriteProps) {
    let { x, y, w, h, img } = props
    img.onloadend = () => this.ctx.drawImage(img, x, y, w, h)
  }
  /**
   * @param {number} sx
   * @param {number} sy
   * @param {number} sw
   * @param {number} sh
   * @returns
   * @memberof Canvas
   */
  getImageData(sx: number, sy: number, sw: number, sh: number) {
    return this.ctx.getImageData(sx, sy, sw, sh)
  }
  /**
   * @param {...INodeProps[]} node
   * @returns {this}
   * @memberof Canvas
   */
  public draw(...node: INodeProps[]): this
  /**
   * @param {...ILabelProps[]} label
   * @returns {this}
   * @memberof Canvas
   */
  public draw(...label: ILabelProps[]): this
  public draw(...sprite: ISpriteProps[]): this
  public draw(...node: INodeProps[] | ILabelProps[] | ISpriteProps[]): this {
    if (node.length > 0) {
      if (Rules.isLabelPropsArray(node)) {
        node.forEach(l => this.fillLabel(l))
      } else if (Rules.isNodePropsArray(node)) {
        node.forEach(n => this.fillNode(n))
      } else if (Rules.isSpritePropsArray(node)) {
        node.forEach(s => this.fillImage(s))
      }
    }
    return this
  }
}
