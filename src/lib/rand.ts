/*
 * @Author: AK-12
 * @Date: 2018-12-27 22:39:11
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-27 22:44:25
 */
export let rand = (max: number, min: number = 0) =>
  parseInt(String(min + (max - min) * Math.random()))
