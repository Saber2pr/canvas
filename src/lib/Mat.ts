/*
 * @Author: AK-12
 * @Date: 2018-12-29 18:41:28
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-31 21:45:00
 */
import { Observable } from './Observable'
/**
 * MatTransform
 * @param mat
 */
export let MatTransform = <T>(mat: T[][]) =>
  mat[0].map((col, i) => mat.map(row => row[i]))
/**
 * MatFill
 * @param value
 * @param x
 * @param y
 */
export let MatFill = <T>(value: T, x: number, y: number = x) =>
  Array(y)
    .fill(0)
    .map(() => Array<T>(x).fill(value))
/**
 * MatClone
 * @param mat
 */
export let MatClone = <T>(mat: T[][]): T[][] => mat.map(raw => [...raw])
/**
 * MatFlat
 * @param mat
 */
export let MatFlat = <T>(mat: T[][]): T[] =>
  Array.prototype.concat.apply([], mat)
/**
 * visitMat
 * @param mat
 * @param callback
 */
export let Mat_foreach = <T>(
  mat: T[][],
  callback: (value: T, raw: number, col: number) => void
) =>
  mat.forEach((raws, index_r) =>
    raws.forEach((col, index_c) => callback(col, index_r, index_c))
  )
/**
 * MatSet
 * @param mat
 * @param value
 * @param raw
 * @param col
 */
export let MatSet = <T>(
  mat: T[][],
  value: T,
  vec: {
    raw: number
    col: number
  }
): T[][] => {
  mat[vec.raw][vec.col] = value
  return mat
}
/**
 * Mat
 *
 * @export
 * @class Mat
 * @extends {Observable<T[][]>}
 * @template T
 */
export class Mat<T> extends Observable<T[][]> {
  /**
   * mat init
   * @param value - T[][]
   */
  constructor(value: T[][])
  /**
   * mat init
   * @param value - T
   * @param cols - number
   */
  constructor(value: T, cols: number)
  /**
   * mat init
   * @param value - T
   * @param cols - number
   * @param rows - number
   */
  constructor(value: T, cols: number, rows: number)
  constructor(value?, cols?, rows?) {
    if (Array.isArray(value)) {
      super(MatClone(value))
      return this
    } else if (typeof cols === 'number') {
      super(MatFill(value, cols, cols))
      return this
    }
    super(MatFill(value, cols, rows))
    return this
  }
  /**
   * raws
   *
   * @readonly
   * @type {number}
   * @memberof Mat
   */
  get raws(): number {
    return this.state.length
  }
  /**
   * cols
   *
   * @readonly
   * @type {number}
   * @memberof Mat
   */
  get cols(): number {
    return this.state[0].length
  }
  /**
   * at
   * @param raw col = raw
   */
  public at(raw: number): T
  /**
   * at
   * @param raw
   * @param col
   */
  public at(raw: number, col: number): T
  public at(raw?, col?): any {
    if (typeof col !== 'undefined') {
      return this.state[raw][col]
    }
    return this.state[raw][raw]
  }
  /**
   * pull
   *
   * @returns {T[][]}
   * @memberof Mat
   */
  public pull(): T[][] {
    return MatClone(this.state)
  }
}
