/*
 * @Author: AK-12
 * @Date: 2018-12-31 22:57:01
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-12-31 22:57:01
 */
/**
 * $
 * @param elementId
 */
export let $ = <K extends HTMLElement>(elementId: string): K =>
  document.getElementById(elementId) as K
