/*
 * @Author: AK-12
 * @Date: 2019-01-01 17:49:55
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-01 17:55:24
 */
/**
 * vec2
 * @param x
 * @param y
 */
export function v2(x: number)
export function v2(x: number, y: number)
export function v2(x: number, y?: number) {
  if (y) {
    return new Vector(x, y)
  }
  return new Vector(x, x)
}
/**
 * Vector
 *
 * @class Vector
 * @implements {IVector}
 */
export class Vector {
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
  isEquals(vector: Vector) {
    return vector.x === this.x && vector.y === this.y
  }
  /**
   * +
   *
   * @param {Vector} vector
   * @returns {Vector}
   * @memberof Vector
   */
  add(vector: Vector): this {
    this.x += vector.x
    this.y += vector.y
    return this
  }
  /**
   * -
   *
   * @param {Vector} vector
   * @memberof Vector
   */
  sub(vector: Vector): this {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }
  /**
   * scale to
   *
   * @param {number} scale
   * @returns
   * @memberof Vector
   */
  mul(scale: number) {
    this.x *= scale
    this.y *= scale
    return this
  }
  /**
   * get negative self
   *
   * @returns
   * @memberof Vector
   */
  neg() {
    this.x = -this.x
    this.y = -this.y
    return this
  }
  /**
   * length
   *
   * @returns
   * @memberof Vector
   */
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
