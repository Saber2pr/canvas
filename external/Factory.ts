/*
 * @Author: AK-12
 * @Date: 2018-12-31 19:58:15
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-12-31 19:58:15
 */
export let create = <C, P>(c: new (props?: P) => C, props?: P): C =>
  new c(props)
