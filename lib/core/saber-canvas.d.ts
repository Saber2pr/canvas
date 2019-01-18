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
    type: 'Rect' | 'Node' | 'Label' | 'Sprite';
}
/**
 * @export
 * @interface IRectProps
 * @extends {IBase}
 */
export interface IRectProps extends IBase {
    x: number;
    y: number;
    w: number;
    h: number;
}
/**
 * @export
 * @interface INodeProps
 * @extends {IRectProps}
 */
export interface INodeProps extends IRectProps {
    color: string;
}
/**
 * @interface ILabelProps
 * @extends {INodeProps}
 */
export interface ILabelProps extends INodeProps {
    text: string;
    fontSize: number;
    fontStyle: string;
}
/**
 * @export
 * @interface ISpriteProps
 * @extends {IRectProps}
 */
export interface ISpriteProps extends IRectProps {
    img: HTMLImageElement;
}
/**
 * Rules
 */
export declare namespace Rules {
    /**
     * @param obj
     */
    const isLabel: (obj: Object) => obj is ILabelProps;
    /**
     * @param obj
     */
    const isLabelPropsArray: (obj: Object[]) => obj is ILabelProps[];
    /**
     * @param obj
     */
    const isNode: (obj: Object) => obj is INodeProps;
    /**
     * @param obj
     */
    const isNodePropsArray: (obj: Object[]) => obj is INodeProps[];
    /**
     * @param obj
     */
    const isSprite: (obj: any) => obj is ISpriteProps;
    /**
     * @param obj
     */
    const isSpritePropsArray: (obj: Object[]) => obj is ISpriteProps[];
    /**
     * @param obj
     */
    const isCanvas: (obj: any) => obj is HTMLCanvasElement;
    /**
     * @param obj
     */
    const isCtx: (obj: any) => obj is CanvasRenderingContext2D;
}
/**
 * @export
 * @interface ICanvas
 * @extends {ICanvasProps}
 */
export interface ICanvas {
    clear(): this;
    clear(rect: IRectProps): this;
    draw(...node: INodeProps[]): this;
    draw(...label: ILabelProps[]): this;
    draw(...sprite: ISpriteProps[]): this;
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
}
/**
 * @export
 * @class Canvas
 * @extends {Node}
 * @implements {ICanvas}
 */
export declare class Canvas implements ICanvas {
    /**
     * @private
     * @type {CanvasRenderingContext2D}
     * @memberof Canvas
     */
    private ctx;
    /**
     *Creates an instance of Canvas.
     * @param {string} elementId
     * @param {number} MaxWidth
     * @param {number} MaxHeight
     * @memberof Canvas
     */
    constructor(elementId: string, MaxWidth: number, MaxHeight: number);
    /**
     * @returns {this}
     * @memberof Canvas
     */
    clear(): this;
    /**
     * @param {IRectProps} rect
     * @returns {this}
     * @memberof Canvas
     */
    clear(rect: IRectProps): this;
    /**
     * @private
     * @param {INodeProps} props
     * @memberof Canvas
     */
    private fillNode;
    /**
     * @private
     * @param {ILabelProps} props
     * @memberof Canvas
     */
    private fillLabel;
    /**
     * @private
     * @param {ISpriteProps} props
     * @returns
     * @memberof Canvas
     */
    private fillImage;
    /**
     * @param {number} sx
     * @param {number} sy
     * @param {number} sw
     * @param {number} sh
     * @returns
     * @memberof Canvas
     */
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    /**
     * @param {...INodeProps[]} node
     * @returns {this}
     * @memberof Canvas
     */
    draw(...node: INodeProps[]): this;
    /**
     * @param {...ILabelProps[]} label
     * @returns {this}
     * @memberof Canvas
     */
    draw(...label: ILabelProps[]): this;
    draw(...sprite: ISpriteProps[]): this;
}
