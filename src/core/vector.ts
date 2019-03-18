export interface v2 {
  x: number
  y: number
}

export class Vec2 implements v2 {
  constructor(public x: number, public y: number) {}
  equals(vec2: Vec2) {
    return this.x === vec2.x && this.y === vec2.y
  }
}

export function v2(x: v2 | number, y?: number) {
  if (typeof x === 'object') {
    return new Vec2(x.x, x.y)
  } else {
    return new Vec2(x, y || x)
  }
}
