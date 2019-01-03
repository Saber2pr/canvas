declare module "lib/Canvas" {
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
        type: 'Rect' | 'Node' | 'Label';
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
     * Rules
     */
    export namespace Rules {
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
        draw(...node: ILabelProps[]): this;
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
    }
}
declare module "lib/Rect" {
    import { IRectProps, INodeProps, ILabelProps } from "lib/Canvas";
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
     * @class Rect
     * @implements {IRect}
     */
    export class Rect implements IRect {
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
    export class Node extends Rect implements INode {
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
    export class Label extends Node implements ILabel {
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
}
declare module "saber-canvas" {
    export * from "lib/Canvas";
    export * from "lib/Rect";
}
declare module "example/helloworld" { }
