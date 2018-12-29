/*
 * @Author: AK-12
 * @Date: 2018-12-27 21:54:43
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-28 21:05:08
 */
/**
 * labReset
 * @param lab
 */
export let labTransform = <T>(lab: T[][]) =>
  lab[0].map((col, i) => lab.map(row => row[i]))
/**
 * labFill
 * @param value
 * @param x
 * @param y
 */
export let labFill = <T>(value: T, x: number, y: number = x) =>
  Array(y)
    .fill(0)
    .map(() => Array<T>(x).fill(value))
/**
 * clone
 * @param lab
 */
export let clone = <T>(lab: T[][]): T[][] => lab.map(raw => [...raw])
/**
 * IAt
 *
 * @interface IAt
 * @template T
 */
interface IAt<T> {
  (v: { x: number; y: number }): T
  (v: { x: number; y: number }, value?: T): T
}
/**
 * Lab
 *
 * @export
 * @class Lab
 * @template T
 */
export class Lab<T = number> {
  private lab: Array<Array<T>>
  /**
   * rows
   *
   * @readonly
   * @type {number}
   * @memberof Lab
   */
  get rows(): number {
    return this.lab.length
  }
  /**
   * cols
   *
   * @readonly
   * @type {number}
   * @memberof Lab
   */
  get cols(): number {
    return this.lab[0].length
  }
  /**
   * lab init
   * @param value - T[][]
   */
  constructor(value: T[][])
  /**
   * lab init
   * @param value - T
   * @param cols - number
   */
  constructor(value: T, cols: number)
  /**
   * lab init
   * @param value - T
   * @param cols - number
   * @param rows - number
   */
  constructor(value: T, cols: number, rows: number)
  constructor(value?: any, cols?: any, rows?: any) {
    if (Array.isArray(value)) {
      this.lab = clone(value)
      return this
    } else if (typeof cols === 'number') {
      this.lab = labFill(value, cols, cols)
      return this
    }
    this.lab = labFill(value, cols, rows)
    return this
  }
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
  public at(v: { x: number; y: number }): T
  /**
   * at
   * @param v - {raw, col}
   * @param value - T
   */
  public at(v: { x: number; y: number }, value?: T): T
  public at(v, value?) {
    if (typeof v === 'number') {
      return this.lab[v][value]
    } else if (typeof v === 'object') {
      if (typeof value !== 'undefined') {
        this.lab[v.x][v.y] = value
        return this.lab[v.x][v.y]
      }
      return this.lab[v.x][v.y]
    }
    return this.lab[v.x][v.y]
  }
  /**
   * transform
   *
   * @returns
   * @memberof Lab
   */
  public transform() {
    this.lab = labTransform(this.lab)
    return this
  }
  /**
   * cat
   *
   * @returns
   * @memberof Lab
   */
  public cat() {
    return clone(this.lab)
  }
  /**
   * setLab
   *
   * @param {T[][]} lab
   * @returns
   * @memberof Lab
   */
  public setLab(lab: T[][]) {
    this.lab = lab
    return this
  }
}
