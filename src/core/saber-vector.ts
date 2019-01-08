/*
 * @Author: AK-12
 * @Date: 2019-01-01 17:49:55
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-08 21:01:04
 */
/**
 * 2 => 4
 * @param value
 */
export const square = (value: number) => Math.pow(value, 2)
/**
 * 3, 4 => 5
 * @param x
 * @param y
 */
export const magnitude2d = (x: number, y: number) =>
  Math.sqrt(square(x) + square(y))
/**
 * @param x
 * @param y
 * @param z
 */
export const magnitude3d = (x: number, y: number, z: number) =>
  Math.sqrt(square(x) + square(y) + square(z))
/**
 * 90 => pi/2
 * @param angle
 */
export const angleToRad = (angle: number) => (angle * Math.PI) / 180
/**
 * pi/2 => 90
 * @param rad
 */
export const radToAngle = (rad: number) => (rad * 180) / Math.PI
/**
 * @interface Vector
 * @template T
 */
interface IVector<T = Vector2D | Vector3D> {
  x: number
  y: number
  z?: number
  isEquals(vector: T): boolean
  add(vector: T): T
  sub(vector: T): T
  mul(vector: T): T
  neg(): T
  mag(): number
}
/**
 * @export
 * @class Vector2D
 * @implements {IVector<Vector2D>}
 */
export class Vector2D implements IVector<Vector2D> {
  x: number
  y: number
  /**
   *Creates an instance of Vector.
   * @param {number} x
   * @memberof Vector
   */
  constructor(x: number)
  /**
   *Creates an instance of Vector.
   * @param {number} x
   * @param {number} y
   * @memberof Vector
   */
  constructor(x: number, y: number)
  constructor(x: number, y?: number) {
    this.x = x
    this.y = y || this.x
  }
  isEquals(vector2d: Vector2D) {
    return vector2d.x === this.x && vector2d.y === this.y
  }
  /**
   * +
   *
   * @param {Vector2D} vector2d
   * @returns {Vector2D}
   * @memberof Vector
   */
  add(vector: Vector2D) {
    return new Vector2D(this.x + vector.x, this.y + vector.y)
  }
  /**
   * -
   *
   * @param {Vector2D} vector2d
   * @memberof Vector
   */
  sub(vector: Vector2D) {
    return new Vector2D(this.x - vector.x, this.y - vector.y)
  }
  /**
   * scale to
   *
   * @param {number} scale
   * @returns
   * @memberof Vector
   */
  mul(vector: Vector2D) {
    return new Vector2D(this.x * vector.x, this.y * vector.y)
  }
  /**
   * get negative self
   *
   * @returns
   * @memberof Vector
   */
  neg() {
    return new Vector2D(-this.x, -this.y)
  }
  /**
   * length
   *
   * @returns
   * @memberof Vector
   */
  mag() {
    return magnitude2d(this.x, this.y)
  }
}
/**
 * @class Vector3D
 * @implements {IVector<Vector3D>}
 */
class Vector3D implements IVector<Vector3D> {
  constructor(public x: number, public y: number, public z: number) {}
  isEquals(vector3d: Vector3D) {
    return (
      this.x === vector3d.x && this.y === vector3d.y && this.z === vector3d.z
    )
  }
  add(vector3d: Vector3D) {
    return new Vector3D(
      this.x + vector3d.x,
      this.y + vector3d.y,
      this.z + vector3d.z
    )
  }
  sub(vector3d: Vector3D) {
    return new Vector3D(
      this.x - vector3d.x,
      this.y - vector3d.y,
      this.z - vector3d.z
    )
  }
  mul(vector: Vector3D) {
    return new Vector3D(this.x * vector.x, this.y * vector.y, this.z * vector.z)
  }
  div(vector: Vector3D) {
    return new Vector3D(this.x / vector.x, this.y / vector.y, this.z / vector.z)
  }
  neg() {
    return new Vector3D(-this.x, -this.y, -this.z)
  }
  mag() {
    return magnitude3d(this.x, this.y, this.z)
  }
  /**
   * @param {Vector3D} vector
   * @returns rad
   * @memberof Vector3D
   */
  angleWith(vector: Vector3D) {
    return this.product(vector) / (this.mag() * vector.mag())
  }
  product(vector: Vector3D) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z
  }
  projection(rad: number) {}
  unitized() {
    return new Vector3D(
      this.x / this.mag(),
      this.y / this.mag(),
      this.z / this.mag()
    )
  }
  rotate(rad: number) {}
}
/**
 * @interface ILine
 * @template T
 */
interface ILine<T = Vector2D | Vector3D> {
  start: T
  end: T
  projection(line: this): Line
  toVec(): Vector3D
}
/**
 * @export
 * @class Line
 * @implements {ILine<Vector3D>}
 */
export class Line implements ILine<Vector3D> {
  constructor(public start: Vector3D, public end: Vector3D) {}
  projection(line: Line) {
    let angle = this.toVec().angleWith(line.toVec())
    let length = this.toVec().mag() * Math.cos(angle)
    let unit = line.toVec().unitized()
    return new Line(
      line.start,
      new Vector3D(unit.x * length, unit.y * length, unit.z * length)
    )
  }
  toVec() {
    return this.end.sub(this.start)
  }
}
export class Axis {
  constructor() {}
}
export class Camera {}
