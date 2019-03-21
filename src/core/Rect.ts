/*
 * @Author: AK-12
 * @Date: 2019-01-03 11:03:08
 * @Last Modified by:   AK-12
 * @Last Modified time: 2019-01-03 11:03:08
 */
import {
  IRectProps,
  INodeProps,
  ILabelProps,
  ISpriteProps
} from './saber-canvas'
import { Vec2, v2 } from 'saber-vector'
import { Size } from './size'
/**
 * @export
 * @interface IRect
 * @extends {IRectProps}
 */
export interface IRect extends IRectProps {
  setPosition(newPosOrX: number | Vec2, y?: number): this
  getPosition(): Vec2
  setSize(w: number, h: number): this
  getContentSize(): Size
}
/**
 * @export
 * @interface INode
 * @extends {INodeProps}
 */
export interface INode extends INodeProps {
  setColor(color: string): this
}
/**
 * @export
 * @interface ILabel
 * @extends {ILabelProps}
 */
export interface ILabel extends ILabelProps {
  setText(text: string): this
  setFontSize(fontSize: number): this
  setFontStyle(fontStyle: string): this
}
/**
 * @export
 * @interface ISprite
 * @extends {IRect}
 */
export interface ISprite extends ISpriteProps {
  setSrc(url: string): this
}
/**
 * @export
 * @class Rect
 * @implements {IRect}
 */
export class Rect implements IRect {
  type: IRect['type']
  x: number
  y: number
  width: number
  height: number
  /**
   *Creates an instance of Rect.
   * @param {number} w
   * @param {number} h
   * @memberof Rect
   */
  constructor(w: number, h: number) {
    this.x = 0
    this.y = 0
    this.width = w
    this.height = h
    this.type = 'Rect'
  }
  /**
   * @param {number} x
   * @param {number} y
   * @returns
   * @memberof Rect
   */
  public setPosition(newPosOrX: number | Vec2, y?: number) {
    if (typeof newPosOrX === 'number') {
      this.x = newPosOrX
      if (typeof y === 'undefined') {
        this.y = newPosOrX
      } else {
        this.y = y
      }
      return this
    } else {
      this.x = newPosOrX.x
      this.y = newPosOrX.y
      return this
    }
  }
  /**
   * @returns
   * @memberof Rect
   */
  public getPosition(): Vec2 {
    return v2(this.x, this.y)
  }
  /**
   * @param {number} w
   * @param {number} h
   * @returns
   * @memberof Rect
   */
  public setSize(w: number, h: number) {
    this.width = w
    this.height = h
    return this
  }
  /**
   * @returns
   * @memberof Rect
   */
  public getContentSize(): Size {
    return new Size(this.width, this.height)
  }
}
/**
 * @export
 * @class Node
 * @extends {Rect}
 * @implements {INode}
 */
export class Node extends Rect implements INode {
  type: INode['type']
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
    this.type = 'Node'
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
  type: ILabel['type']
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
    this.type = 'Label'
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
 * @class Sprite
 * @extends {Rect}
 */
export class Sprite extends Rect implements ISprite {
  type: ISprite['type']
  img: HTMLImageElement
  /**
   *Creates an instance of Sprite.
   * @param {string} src
   * @memberof Sprite
   */
  constructor(url: string) {
    super(0, 0)
    this.type = 'Sprite'
    this.img = new Image()
    this.img.src = url
    this.setSize(this.img.width, this.img.height)
  }
  setSrc(url: string) {
    this.img.src = url
    return this
  }
}
