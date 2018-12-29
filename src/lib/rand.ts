/*
 * @Author: AK-12
 * @Date: 2018-12-27 22:39:11
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-12-27 22:44:25
 */
/**
 * random
 * @param max
 * @param min
 */
export let random = (max: number, min: number = 0) =>
  min + (max - min) * Math.random()
/**
 * rand
 * @param max
 * @param min
 */
export let rand = (max: number, min: number = 0) =>
  parseInt(String(random(max, min)))
/**
 * randVec
 * @param x
 * @param y
 */
export let randVec = (x: number, y: number = x) => ({ x: rand(x), y: rand(y) })
