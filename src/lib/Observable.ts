/**
 * compose
 *
 * @export
 * @template argType
 * @param {...Array<(...args: argType[]) => argType>} funcs
 * @returns
 */
export function compose<argType>(
  ...funcs: Array<(...args: argType[]) => argType>
) {
  if (funcs.length === 0) {
    return (arg: argType) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
/**
 * clone
 *
 * @export
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}
/**
 * Observable
 *
 * @export
 * @class Observable
 * @template T
 */
export class Observable<T = any> {
  /**
   *Creates an instance of Observable.
   * @param {T} state
   * @memberof Observable
   */
  constructor(state: T) {
    this.state = state
  }
  protected state: T
  /**
   * compose
   *
   * @param {...Array<(...args: T[]) => T>} funcs
   * @memberof Observable
   */
  public compose(...funcs: Array<(...args: T[]) => T>) {
    this.state = compose(...funcs)(this.state)
    return this
  }
  /**
   * pipe
   *
   * @param {...Array<(...args: T[]) => T>} funcs
   * @memberof Observable
   */
  public pipe(...funcs: Array<(...args: T[]) => T>) {
    this.state = compose(...funcs.reverse())(this.state)
    return this
  }
  /**
   * push
   *
   * @param {T} state
   * @memberof Observable
   */
  public push(state: T) {
    this.state = clone(state)
    return this
  }
  /**
   * pull
   *
   * @returns {T}
   * @memberof Observable
   */
  public pull(): T {
    return clone(this.state)
  }
}
