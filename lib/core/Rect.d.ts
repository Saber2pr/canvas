import { IRectProps, INodeProps, ILabelProps, ISpriteProps } from './saber-canvas';
/**
 * @export
 * @interface IRect
 * @extends {IRectProps}
 */
export interface IRect extends IRectProps {
    setPosition(x: number, y: number): this;
    setSize(w: number, h: number): this;
}
/**
 * @export
 * @interface INode
 * @extends {INodeProps}
 */
export interface INode extends INodeProps {
    setColor(color: string): this;
}
/**
 * @export
 * @interface ILabel
 * @extends {ILabelProps}
 */
export interface ILabel extends ILabelProps {
    setText(text: string): this;
    setFontSize(fontSize: number): this;
    setFontStyle(fontStyle: string): this;
}
/**
 * @export
 * @interface ISprite
 * @extends {IRect}
 */
export interface ISprite extends ISpriteProps {
    setSrc(url: string): this;
}
/**
 * @export
 * @class Rect
 * @implements {IRect}
 */
export declare class Rect implements IRect {
    type: IRect['type'];
    x: number;
    y: number;
    w: number;
    h: number;
    /**
     *Creates an instance of Rect.
     * @param {number} w
     * @param {number} h
     * @memberof Rect
     */
    constructor(w: number, h: number);
    /**
     * @param {number} x
     * @param {number} y
     * @returns
     * @memberof Rect
     */
    setPosition(x: number, y: number): this;
    /**
     * @param {number} w
     * @param {number} h
     * @returns
     * @memberof Rect
     */
    setSize(w: number, h: number): this;
}
/**
 * @export
 * @class Node
 * @extends {Rect}
 * @implements {INode}
 */
export declare class Node extends Rect implements INode {
    type: INode['type'];
    color: string;
    /**
     *Creates an instance of Node.
     * @param {number} w
     * @param {number} h
     * @memberof Node
     */
    constructor(w: number, h: number);
    /**
     * @param {string} color
     * @returns
     * @memberof Node
     */
    setColor(color: string): this;
}
/**
 * @export
 * @class Label
 * @extends {Node}
 * @implements {ILabel}
 */
export declare class Label extends Node implements ILabel {
    type: ILabel['type'];
    fontSize: number;
    fontStyle: string;
    text: string;
    /**
     *Creates an instance of Label.
     * @param {string} text
     * @param {number} [fontSize=23]
     * @memberof Label
     */
    constructor(text: string, fontSize?: number);
    /**
     * @param {number} fontSize
     * @returns
     * @memberof Label
     */
    setFontSize(fontSize: number): this;
    /**
     * @param {string} fontStyle
     * @returns
     * @memberof Label
     */
    setFontStyle(fontStyle: string): this;
    /**
     * @param {string} text
     * @returns
     * @memberof Label
     */
    setText(text: string): this;
}
/**
 * @export
 * @class Sprite
 * @extends {Rect}
 */
export declare class Sprite extends Rect implements ISprite {
    type: ISprite['type'];
    img: HTMLImageElement;
    /**
     *Creates an instance of Sprite.
     * @param {string} src
     * @memberof Sprite
     */
    constructor(url: string);
    setSrc(url: string): this;
}
