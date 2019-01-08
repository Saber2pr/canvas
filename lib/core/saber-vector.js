"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: AK-12
 * @Date: 2019-01-01 17:49:55
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-08 21:42:06
 */
/**
 * 2 => 4
 * @param value
 */
exports.square = function (value) { return Math.pow(value, 2); };
/**
 * 3, 4 => 5
 * @param x
 * @param y
 */
exports.magnitude2d = function (x, y) {
    return Math.sqrt(exports.square(x) + exports.square(y));
};
/**
 * @param x
 * @param y
 * @param z
 */
exports.magnitude3d = function (x, y, z) {
    return Math.sqrt(exports.square(x) + exports.square(y) + exports.square(z));
};
/**
 * 90 => pi/2
 * @param angle
 */
exports.angleToRad = function (angle) { return (angle * Math.PI) / 180; };
/**
 * pi/2 => 90
 * @param rad
 */
exports.radToAngle = function (rad) { return (rad * 180) / Math.PI; };
/**
 * @export
 * @class Vector2D
 * @implements {IVector<Vector2D>}
 */
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        var _this = this;
        this.props = function () { return ({ x: _this.x, y: _this.y }); };
        this.x = x;
        this.y = y;
    }
    Vector2D.prototype.isEquals = function (vector2d) {
        return vector2d.x === this.x && vector2d.y === this.y;
    };
    Vector2D.prototype.add = function (vector) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    };
    Vector2D.prototype.sub = function (vector) {
        return new Vector2D(this.x - vector.x, this.y - vector.y);
    };
    Vector2D.prototype.mul = function (vector) {
        return new Vector2D(this.x * vector.x, this.y * vector.y);
    };
    Vector2D.prototype.div = function (vector) {
        return new Vector2D(this.x / vector.x, this.y / vector.y);
    };
    Vector2D.prototype.neg = function () {
        return new Vector2D(-this.x, -this.y);
    };
    Vector2D.prototype.mag = function () {
        return exports.magnitude2d(this.x, this.y);
    };
    Vector2D.prototype.angleWith = function (vector) {
        return this.product(vector) / (this.mag() * vector.mag());
    };
    Vector2D.prototype.product = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };
    Vector2D.prototype.unitized = function () {
        return new Vector2D(this.x / this.mag(), this.y / this.mag());
    };
    return Vector2D;
}());
exports.Vector2D = Vector2D;
/**
 * @export
 * @class Vector3D
 * @implements {IVector<Vector3D>}
 */
var Vector3D = /** @class */ (function () {
    function Vector3D(x, y, z) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.z = z;
        this.props = function () { return ({ x: _this.x, y: _this.y, z: _this.z }); };
    }
    Vector3D.prototype.isEquals = function (vector3d) {
        return (this.x === vector3d.x && this.y === vector3d.y && this.z === vector3d.z);
    };
    Vector3D.prototype.add = function (vector3d) {
        return new Vector3D(this.x + vector3d.x, this.y + vector3d.y, this.z + vector3d.z);
    };
    Vector3D.prototype.sub = function (vector3d) {
        return new Vector3D(this.x - vector3d.x, this.y - vector3d.y, this.z - vector3d.z);
    };
    Vector3D.prototype.mul = function (vector) {
        return new Vector3D(this.x * vector.x, this.y * vector.y, this.z * vector.z);
    };
    Vector3D.prototype.div = function (vector) {
        return new Vector3D(this.x / vector.x, this.y / vector.y, this.z / vector.z);
    };
    Vector3D.prototype.neg = function () {
        return new Vector3D(-this.x, -this.y, -this.z);
    };
    Vector3D.prototype.mag = function () {
        return exports.magnitude3d(this.x, this.y, this.z);
    };
    Vector3D.prototype.angleWith = function (vector) {
        return Math.acos(this.product(vector) / (this.mag() * vector.mag()));
    };
    Vector3D.prototype.product = function (vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    };
    Vector3D.prototype.unitized = function () {
        return new Vector3D(this.x / this.mag(), this.y / this.mag(), this.z / this.mag());
    };
    return Vector3D;
}());
exports.Vector3D = Vector3D;
/**
 * @export
 * @class Line
 * @implements {ILine<Vector3D>}
 */
var Line = /** @class */ (function () {
    function Line(start, end) {
        this.start = start;
        this.end = end;
    }
    Line.prototype.projection = function (line) {
        var angle = this.toVec().angleWith(line.toVec());
        var length = this.toVec().mag() * Math.cos(angle);
        var unit = line.toVec().unitized();
        return new Line(line.start, new Vector3D(unit.x * length, unit.y * length, unit.z * length));
    };
    Line.prototype.toVec = function () {
        return this.end.sub(this.start);
    };
    return Line;
}());
exports.Line = Line;
