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
    isEquals(vector: T): boolean;
    add(vector: T): T;
    sub(vector: T): T;
    mul(vector: T): T;
    neg(): T;
    mag(): number;
}
/**
 * @export
 * @class Vector2D
 * @implements {IVector<Vector2D>}
 */
export declare class Vector2D implements IVector<Vector2D> {
    x: number;
    y: number;
    /**
     *Creates an instance of Vector.
     * @param {number} x
     * @memberof Vector
     */
    constructor(x: number);
    /**
     *Creates an instance of Vector.
     * @param {number} x
     * @param {number} y
     * @memberof Vector
     */
    constructor(x: number, y: number);
    isEquals(vector2d: Vector2D): boolean;
    /**
     * +
     *
     * @param {Vector2D} vector2d
     * @returns {Vector2D}
     * @memberof Vector
     */
    add(vector: Vector2D): Vector2D;
    /**
     * -
     *
     * @param {Vector2D} vector2d
     * @memberof Vector
     */
    sub(vector: Vector2D): Vector2D;
    /**
     * scale to
     *
     * @param {number} scale
     * @returns
     * @memberof Vector
     */
    mul(vector: Vector2D): Vector2D;
    /**
     * get negative self
     *
     * @returns
     * @memberof Vector
     */
    neg(): Vector2D;
    /**
     * length
     *
     * @returns
     * @memberof Vector
     */
    mag(): number;
}
/**
 * @class Vector3D
 * @implements {IVector<Vector3D>}
 */
declare class Vector3D implements IVector<Vector3D> {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    isEquals(vector3d: Vector3D): boolean;
    add(vector3d: Vector3D): Vector3D;
    sub(vector3d: Vector3D): Vector3D;
    mul(vector: Vector3D): Vector3D;
    div(vector: Vector3D): Vector3D;
    neg(): Vector3D;
    mag(): number;
    /**
     * @param {Vector3D} vector
     * @returns rad
     * @memberof Vector3D
     */
    angleWith(vector: Vector3D): number;
    product(vector: Vector3D): number;
    projection(rad: number): void;
    unitized(): Vector3D;
    rotate(rad: number): void;
}
/**
 * @interface ILine
 * @template T
 */
interface ILine<T = Vector2D | Vector3D> {
    start: T;
    end: T;
    projection(line: this): Line;
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
export declare class Axis {
    constructor();
}
export declare class Camera {
}
export {};
