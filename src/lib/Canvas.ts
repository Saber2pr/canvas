/*
 * @Author: AK-12
 * @Date: 2018-12-29 23:10:57
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-29 23:37:28
 */
export class Canvas {
  private ctx: CanvasRenderingContext2D
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
  /**
   *Creates an instance of Canvas.
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @param {string} color
   * @memberof Canvas
   */
  constructor(w: number, h: number, color: string, x: number, y: number)
  constructor(w?, h?, color?, x?, y?) {
    let ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
    if (ctx) {
      this.ctx = ctx
      this.ctx.fillStyle = color || '#639181'
      this.ctx.fillRect(
        x || 0,
        y || 0,
        w || this.ctx.canvas.width,
        h || this.ctx.canvas.height
      )
    }
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
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   * @memberof Canvas
   */
  public clear(x: number, y: number, w: number, h: number): Canvas
  public clear(x?, y?, w?, h?) {
    this.ctx.clearRect(
      x || 0,
      y || 0,
      w || this.ctx.canvas.width,
      h || this.ctx.canvas.height
    )
    return this
  }
  /**
   * drawBlock
   *
   * @param {Block} block
   * @memberof Canvas
   */
  public drawBlock(block: Block) {
    this.ctx.fillStyle = block.getProps().color
    let { x, y, width, height, color } = block.getProps()
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, width, height)
  }
}
/**
 * IBlockProps
 *
 * @interface IBlockProps
 */
interface IBlockProps {
  x: number
  y: number
  width: number
  height: number
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
    width: 50,
    height: 50,
    color: '#000000'
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
  constructor(w?, h?) {
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
  public setSize(w?, h?) {
    this.props.width = w
    this.props.height = h || w
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
  public setPosition(x?, y?) {
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
