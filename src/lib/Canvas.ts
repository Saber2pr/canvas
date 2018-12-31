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
interface IBlockProps extends IBaseProps {
  x: number
  y: number
}
/**
 * Rules
 */
namespace Rules {
  export let isBlock = (obj: any): obj is IBlockProps =>
    typeof (obj as IBlockProps)['x'] !== 'undefined'
  export let isLabel = (obj: any): obj is ILabelProps =>
    typeof (obj as ILabelProps)['fontSize'] !== 'undefined'
}
/**
 * ILabelProps
 *
 * @interface ILabelProps
 * @extends {}
 */
interface ILabelProps extends IBlockProps {
  text: string
  fontSize: number
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
    this.ctx.fillStyle = this.color || '#639181'
    this.ctx.fillRect(0, 0, this.w, this.h)
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
      let { x, y, w, h } = block.getProps()
      this.ctx.clearRect(x, y, w, h)
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
  public clearAll() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    return this
  }
  /**
   * fillWithProps
   *
   * @private
   * @memberof Canvas
   */
  private fillWithProps(props: IBlockProps)
  private fillWithProps(props: ILabelProps)
  private fillWithProps(props) {
    if (Rules.isBlock(props)) {
      let { x, y, w, h, color } = props
      this.ctx.fillStyle = color
      this.ctx.fillRect(x, y, w, h)
    }
    if (Rules.isLabel(props)) {
      let { x, y, fontSize, text } = props
      this.ctx.font = String(fontSize) + 'px' + ' ' + 'serif'
      this.ctx.fillText(text, x, y)
      console.log('label: ', props)
    }
  }
  /**
   * drawBlock
   *
   * @param {...Block[]} block
   * @returns
   * @memberof Canvas
   */
  public drawBlock(...block: Block[]) {
    block.forEach(blk => this.fillWithProps(blk.getProps()))
    return this
  }
  /**
   *
   *
   * @memberof Canvas
   */
  public drawLabel(...label: Label[]) {
    label.forEach(lab => this.fillWithProps(lab.getProps()))
    return this
  }
}
/**
 * Block
 *
 * @export
 * @class Block
 */
export class Block {
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
    this.color = color || '#696949'
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
  public setPosition(x: number): Block
  /**
   * setPosition
   *
   * @param {number} x
   * @param {number} y
   * @memberof Block
   */
  public setPosition(x: number, y: number): Block
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
  public getProps(): IBlockProps {
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
 * @extends {Block}
 */
export class Label extends Block {
  protected fontSize: number
  protected text: string
  /**
   *Creates an instance of Label.
   * @param {number} w
   * @param {number} h
   * @param {number} fontSize
   * @param {string} text
   * @memberof Label
   */
  constructor(w: number, h: number, fontSize: number, text: string) {
    super(w, h)
    this.fontSize = fontSize
    this.text = text
  }
  /**
   * setFontSize
   *
   * @param {number} fontSize
   * @memberof Label
   */
  public setFontSize(fontSize: number) {
    this.fontSize = fontSize
  }
  /**
   * setText
   *
   * @param {string} text
   * @memberof Label
   */
  public setText(text: string)
  /**
   * setText
   *
   * @param {string} text
   * @param {number} fontSize
   * @memberof Label
   */
  public setText(text: string, fontSize: number)
  public setText(text: string, fontSize?: number) {
    this.text = text
    this.fontSize = fontSize || 48
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
      text: this.text
    }
  }
}
