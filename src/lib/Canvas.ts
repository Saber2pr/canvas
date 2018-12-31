/*
 * @Author: AK-12
 * @Date: 2018-12-29 23:10:57
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-30 21:30:01
 */
interface IProps {
  w: number
  h: number
  color: string
}
export class Canvas {
  private ctx: CanvasRenderingContext2D
  private _props: IProps
  /**
   * props set
   *
   * @memberof Canvas
   */
  set props(props: IProps) {
    this._props = props
  }
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
      this.props = {
        w: canvas.width,
        h: canvas.height,
        color: color || '#639181'
      }
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
    let { w, h, color } = this._props
    this.ctx.fillStyle = color || '#639181'
    this.ctx.fillRect(0, 0, w, h)
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
   * @param {Block} x
   * @returns {Canvas}
   * @memberof Canvas
   */
  public clear(block: Block): Canvas
  public clear(block?: Block) {
    if (block) {
      if (isBlock(block)) {
        let { x, y, w, h } = block.getProps()
        this.ctx.clearRect(x, y, w, h)
        return this
      }
    }
    this.resetCtx()
    return this
  }
  /**
   * fillWithProps
   *
   * @private
   * @memberof Canvas
   */
  private fillWithProps = (props: IBlockProps) => {
    let { x, y, w, h, color } = props
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, w, h)
  }
  /**
   * drawBlock
   *
   * @param {IBlockProps} block
   * @memberof Canvas
   */
  public drawBlock(block: IBlockProps): Canvas
  /**
   * drawBlock
   *
   * @param {Block} block
   * @memberof Canvas
   */
  public drawBlock(block: Block): Canvas
  public drawBlock(block: IBlockProps | Block) {
    if (isBlock(block)) {
      this.fillWithProps(block.getProps())
      return this
    } else if (isBlockProps(block)) {
      this.fillWithProps(block)
      return this
    }
    return this
  }
}
/**
 * isBlock
 * @param block
 */
let isBlock = (block: any): block is Block =>
  typeof (block as Block)['getProps'] !== 'undefined'
/**
 * isBlockProps
 * @param block
 */
let isBlockProps = (block: any): block is IBlockProps =>
  typeof (block as IBlockProps)['x'] !== 'undefined'
/**
 * IBlockProps
 *
 * @interface IBlockProps
 */
interface IBlockProps {
  x: number
  y: number
  w: number
  h: number
  color: string
}
/**
 * Block
 *
 * @export
 * @class Block
 */
export class Block {
  private props: IBlockProps = {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
    color: '#696949'
  }
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
  constructor(w: number, h?: number) {
    this.setSize(w, h || w)
  }
  /**
   * setColor
   *
   * @param {string} color
   * @returns
   * @memberof Block
   */
  public setColor(color: string) {
    this.props.color = color
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
    this.props.w = w
    this.props.h = h || w
    return this
  }
  /**
   * setPosition
   *
   * @param {number} x
   * @memberof Block
   */
  public setPosition(x: number)
  /**
   * setPosition
   *
   * @param {number} x
   * @param {number} y
   * @memberof Block
   */
  public setPosition(x: number, y: number)
  public setPosition(x: number, y?: number) {
    this.props.x = x
    this.props.y = y || x
    return this
  }
  /**
   * getProps
   *
   * @returns
   * @memberof Block
   */
  public getProps() {
    return this.props
  }
}
