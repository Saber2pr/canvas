/*
 * @Author: AK-12
 * @Date: 2019-01-01 17:49:55
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-08 21:42:06
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
  /**
   * props
   *
   * @memberof IVector
   */
  props: () => {
    x: number
    y: number
    z?: number
  }
  /**
   * isEquals
   *
   * @param {T} vector
   * @returns {boolean}
   * @memberof IVector
   */
  isEquals(vector: T): boolean
  /**
   * +
   *
   * @param {T} vector
   * @returns {T}
   * @memberof IVector
   */
  add(vector: T): T
  /**
   * -
   *
   * @param {T} vector
   * @returns {T}
   * @memberof IVector
   */
  sub(vector: T): T
  /**
   * *
   *
   * @param {T} vector
   * @returns {T}
   * @memberof IVector
   */
  mul(vector: T): T
  /**
   * /
   *
   * @param {T} vector
   * @returns {T}
   * @memberof IVector
   */
  div(vector: T): T
  /**
   * return -1 * self
   *
   * @returns {T}
   * @memberof IVector
   */
  neg(): T
  /**
   * length
   *
   * @returns {number}
   * @memberof IVector
   */
  mag(): number
  /**
   * angle by vector
   *
   * @param {T} vector
   * @returns {number}
   * @memberof IVector
   */
  angleWith(vector: T): number
  /**
   * vec1 . vec2
   *
   * @param {T} vector
   * @returns {number}
   * @memberof IVector
   */
  product(vector: T): number
  /**
   * return its unit
   *
   * @param {T} vector
   * @returns {T}
   * @memberof IVector
   */
  unitized(vector: T): T
}
/**
 * @export
 * @class Vector2D
 * @implements {IVector<Vector2D>}
 */
export class Vector2D implements IVector<Vector2D> {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  props = () => ({ x: this.x, y: this.y })
  isEquals(vector2d: Vector2D) {
    return vector2d.x === this.x && vector2d.y === this.y
  }
  add(vector: Vector2D) {
    return new Vector2D(this.x + vector.x, this.y + vector.y)
  }
  sub(vector: Vector2D) {
    return new Vector2D(this.x - vector.x, this.y - vector.y)
  }
  mul(vector: Vector2D) {
    return new Vector2D(this.x * vector.x, this.y * vector.y)
  }
  div(vector: Vector2D) {
    return new Vector2D(this.x / vector.x, this.y / vector.y)
  }
  neg() {
    return new Vector2D(-this.x, -this.y)
  }
  mag() {
    return magnitude2d(this.x, this.y)
  }
  angleWith(vector: Vector2D) {
    return this.product(vector) / (this.mag() * vector.mag())
  }
  product(vector: Vector2D) {
    return this.x * vector.x + this.y * vector.y
  }
  unitized() {
    return new Vector2D(this.x / this.mag(), this.y / this.mag())
  }
}
/**
 * @export
 * @class Vector3D
 * @implements {IVector<Vector3D>}
 */
export class Vector3D implements IVector<Vector3D> {
  constructor(public x: number, public y: number, public z: number) {}
  props = () => ({ x: this.x, y: this.y, z: this.z })
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
  angleWith(vector: Vector3D) {
    return Math.acos(this.product(vector) / (this.mag() * vector.mag()))
  }
  product(vector: Vector3D) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z
  }
  unitized() {
    return new Vector3D(
      this.x / this.mag(),
      this.y / this.mag(),
      this.z / this.mag()
    )
  }
}
/**
 * @interface ILine
 * @template T
 */
interface ILine<T = Vector2D | Vector3D> {
  start: T
  end: T
  /**
   * return projection-self on line-target
   *
   * @param {this} line
   * @returns {Line}
   * @memberof ILine
   */
  projection(line: this): Line
  /**
   *return its vector, from start to end
   *
   * @returns {Vector3D}
   * @memberof ILine
   */
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
