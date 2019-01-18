"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @export
 * @class Rect
 * @implements {IRect}
 */
var Rect = /** @class */ (function () {
    /**
     *Creates an instance of Rect.
     * @param {number} w
     * @param {number} h
     * @memberof Rect
     */
    function Rect(w, h) {
        this.x = 0;
        this.y = 0;
        this.w = w;
        this.h = h;
        this.type = 'Rect';
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns
     * @memberof Rect
     */
    Rect.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    /**
     * @param {number} w
     * @param {number} h
     * @returns
     * @memberof Rect
     */
    Rect.prototype.setSize = function (w, h) {
        this.w = w;
        this.h = h;
        return this;
    };
    return Rect;
}());
exports.Rect = Rect;
/**
 * @export
 * @class Node
 * @extends {Rect}
 * @implements {INode}
 */
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    /**
     *Creates an instance of Node.
     * @param {number} w
     * @param {number} h
     * @memberof Node
     */
    function Node(w, h) {
        var _this = _super.call(this, w, h) || this;
        _this.color = '#3a32af';
        _this.type = 'Node';
        return _this;
    }
    /**
     * @param {string} color
     * @returns
     * @memberof Node
     */
    Node.prototype.setColor = function (color) {
        this.color = color;
        return this;
    };
    return Node;
}(Rect));
exports.Node = Node;
/**
 * @export
 * @class Label
 * @extends {Node}
 * @implements {ILabel}
 */
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    /**
     *Creates an instance of Label.
     * @param {string} text
     * @param {number} [fontSize=23]
     * @memberof Label
     */
    function Label(text, fontSize) {
        if (fontSize === void 0) { fontSize = 23; }
        var _this = _super.call(this, text.length * fontSize, fontSize) || this;
        _this.fontStyle = 'serif';
        _this.color = '563a6d';
        _this.text = text;
        _this.fontSize = fontSize;
        _this.type = 'Label';
        return _this;
    }
    /**
     * @param {number} fontSize
     * @returns
     * @memberof Label
     */
    Label.prototype.setFontSize = function (fontSize) {
        this.fontSize = fontSize;
        this.setSize(this.text.length * fontSize, fontSize);
        return this;
    };
    /**
     * @param {string} fontStyle
     * @returns
     * @memberof Label
     */
    Label.prototype.setFontStyle = function (fontStyle) {
        this.fontStyle = fontStyle;
        return this;
    };
    /**
     * @param {string} text
     * @returns
     * @memberof Label
     */
    Label.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    return Label;
}(Node));
exports.Label = Label;
/**
 * @export
 * @class Sprite
 * @extends {Rect}
 */
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    /**
     *Creates an instance of Sprite.
     * @param {string} src
     * @memberof Sprite
     */
    function Sprite(url) {
        var _this = _super.call(this, 0, 0) || this;
        _this.type = 'Sprite';
        _this.img = new Image();
        _this.img.src = url;
        _this.setSize(_this.img.width, _this.img.height);
        return _this;
    }
    Sprite.prototype.setSrc = function (url) {
        this.img.src = url;
        return this;
    };
    return Sprite;
}(Rect));
exports.Sprite = Sprite;
