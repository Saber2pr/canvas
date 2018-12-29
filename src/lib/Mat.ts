/*
 * @Author: AK-12
 * @Date: 2018-12-29 18:41:28
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-29 18:53:34
 */
import { Observable } from './Observable'
/**
 * MatTransform
 * @param lab
 */
export let MatTransform = <T>(lab: T[][]) =>
  lab[0].map((col, i) => lab.map(row => row[i]))
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
 * @param lab
 */
export let MatClone = <T>(lab: T[][]): T[][] => lab.map(raw => [...raw])
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
  constructor(value?: any, cols?: any, rows?: any) {
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
   * at
   * @param v raw || col
   */
  public at(v: number)
  /**
   * at
   * @param v raw
   * @param value col
   */
  public at(v: number, value: number)
  /**
   * at
   * @param v - {raw, col}
   */
  public at(v: { raw: number; col: number }): T
  /**
   * at
   * @param v - {raw, col}
   * @param value - T
   */
  public at(v: { raw: number; col: number }, value?: T): T
  public at(v, value?) {
    if (typeof v === 'number') {
      if (typeof value === 'undefined') {
        return this.state[v][v]
      }
      return this.state[v][value]
    } else if (typeof v === 'object') {
      if (typeof value !== 'undefined') {
        this.state[v.raw][v.col] = value
        return this.state[v.raw][v.col]
      }
      return this.state[v.raw][v.col]
    }
    return this.state[v.raw][v.col]
  }
}
