/**
 * 2 => 4
 * @param value
 */
export declare const square: (value: number) => number;
/**
 * 3, 4 => 5
 * @param x
 * @param y
 */
export declare const magnitude2d: (x: number, y: number) => number;
/**
 * @param x
 * @param y
 * @param z
 */
export declare const magnitude3d: (x: number, y: number, z: number) => number;
/**
 * 90 => pi/2
 * @param angle
 */
export declare const angleToRad: (angle: number) => number;
/**
 * pi/2 => 90
 * @param rad
 */
export declare const radToAngle: (rad: number) => number;
/**
 * @interface Vector
 * @template T
 */
interface IVector<T = Vector2D | Vector3D> {
    x: number;
    y: number;
    z?: number;
    /**
     * props
     *
     * @memberof IVector
     */
    props: () => {
        x: number;
        y: number;
        z?: number;
    };
    /**
     * isEquals
     *
     * @param {T} vector
     * @returns {boolean}
     * @memberof IVector
     */
    isEquals(vector: T): boolean;
    /**
     * +
     *
     * @param {T} vector
     * @returns {T}
     * @memberof IVector
     */
    add(vector: T): T;
    /**
     * -
     *
     * @param {T} vector
     * @returns {T}
     * @memberof IVector
     */
    sub(vector: T): T;
    /**
     * *
     *
     * @param {T} vector
     * @returns {T}
     * @memberof IVector
     */
    mul(vector: T): T;
    /**
     * /
     *
     * @param {T} vector
     * @returns {T}
     * @memberof IVector
     */
    div(vector: T): T;
    /**
     * return -1 * self
     *
     * @returns {T}
     * @memberof IVector
     */
    neg(): T;
    /**
     * length
     *
     * @returns {number}
     * @memberof IVector
     */
    mag(): number;
    /**
     * angle by vector
     *
     * @param {T} vector
     * @returns {number}
     * @memberof IVector
     */
    angleWith(vector: T): number;
    /**
     * vec1 . vec2
     *
     * @param {T} vector
     * @returns {number}
     * @memberof IVector
     */
    product(vector: T): number;
    /**
     * return its unit
     *
     * @param {T} vector
     * @returns {T}
     * @memberof IVector
     */
    unitized(vector: T): T;
}
/**
 * @export
 * @class Vector2D
 * @implements {IVector<Vector2D>}
 */
export declare class Vector2D implements IVector<Vector2D> {
    x: number;
    y: number;
    constructor(x: number, y: number);
    props: () => {
        x: number;
        y: number;
    };
    isEquals(vector2d: Vector2D): boolean;
    add(vector: Vector2D): Vector2D;
    sub(vector: Vector2D): Vector2D;
    mul(vector: Vector2D): Vector2D;
    div(vector: Vector2D): Vector2D;
    neg(): Vector2D;
    mag(): number;
    angleWith(vector: Vector2D): number;
    product(vector: Vector2D): number;
    unitized(): Vector2D;
}
/**
 * @export
 * @class Vector3D
 * @implements {IVector<Vector3D>}
 */
export declare class Vector3D implements IVector<Vector3D> {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    props: () => {
        x: number;
        y: number;
        z: number;
    };
    isEquals(vector3d: Vector3D): boolean;
    add(vector3d: Vector3D): Vector3D;
    sub(vector3d: Vector3D): Vector3D;
    mul(vector: Vector3D): Vector3D;
    div(vector: Vector3D): Vector3D;
    neg(): Vector3D;
    mag(): number;
    angleWith(vector: Vector3D): number;
    product(vector: Vector3D): number;
    unitized(): Vector3D;
}
/**
 * @interface ILine
 * @template T
 */
interface ILine<T = Vector2D | Vector3D> {
    start: T;
    end: T;
    /**
     * return projection-self on line-target
     *
     * @param {this} line
     * @returns {Line}
     * @memberof ILine
     */
    projection(line: this): Line;
    /**
     *return its vector, from start to end
     *
     * @returns {Vector3D}
     * @memberof ILine
     */
    toVec(): Vector3D;
}
/**
 * @export
 * @class Line
 * @implements {ILine<Vector3D>}
 */
export declare class Line implements ILine<Vector3D> {
    start: Vector3D;
    end: Vector3D;
    constructor(start: Vector3D, end: Vector3D);
    projection(line: Line): Line;
    toVec(): Vector3D;
}
export {};
