"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rules
 */
var Rules;
(function (Rules) {
    /**
     * @param obj
     */
    Rules.isLabel = function (obj) {
        return obj['type'] === 'Label';
    };
    /**
     * @param obj
     */
    Rules.isLabelPropsArray = function (obj) {
        return Rules.isLabel(obj[0]);
    };
    /**
     * @param obj
     */
    Rules.isNode = function (obj) {
        return obj['type'] === 'Node';
    };
    /**
     * @param obj
     */
    Rules.isNodePropsArray = function (obj) {
        return Rules.isNode(obj[0]);
    };
    /**
     * @param obj
     */
    Rules.isCanvas = function (obj) {
        return typeof obj['getContext'] !== 'undefined';
    };
    /**
     * @param obj
     */
    Rules.isCtx = function (obj) {
        return typeof obj['canvas'] !== 'undefined';
    };
})(Rules = exports.Rules || (exports.Rules = {}));
/**
 * @export
 * @class Canvas
 * @extends {Node}
 * @implements {ICanvas}
 */
var Canvas = /** @class */ (function () {
    /**
     *Creates an instance of Canvas.
     * @param {string} elementId
     * @param {number} MaxWidth
     * @param {number} MaxHeight
     * @memberof Canvas
     */
    function Canvas(elementId, MaxWidth, MaxHeight) {
        var canvas = document.getElementById(elementId);
        if (canvas) {
            if (Rules.isCanvas(canvas)) {
                canvas.width = MaxWidth;
                canvas.height = MaxHeight;
                var ctx = canvas.getContext('2d');
                if (Rules.isCtx(ctx)) {
                    this.ctx = ctx;
                }
            }
        }
        else {
            throw 'cannot get canvas element by id: ' + elementId;
        }
    }
    Canvas.prototype.clear = function (rect) {
        if (rect) {
            var x = rect.x, y = rect.y, w = rect.w, h = rect.h;
            this.ctx.clearRect(x, y, w, h);
            return this;
        }
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        return this;
    };
    /**
     * @private
     * @param {INodeProps} props
     * @memberof Canvas
     */
    Canvas.prototype.fillNode = function (props) {
        var x = props.x, y = props.y, w = props.w, h = props.h, color = props.color;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    };
    /**
     * @private
     * @param {ILabelProps} props
     * @memberof Canvas
     */
    Canvas.prototype.fillLabel = function (props) {
        var x = props.x, y = props.y, h = props.h, color = props.color, fontSize = props.fontSize, fontStyle = props.fontStyle, text = props.text;
        this.ctx.font = String(fontSize) + 'px' + ' ' + fontStyle;
        this.ctx.strokeStyle = color;
        this.ctx.strokeText(text, x, y + h);
    };
    Canvas.prototype.draw = function () {
        var _this = this;
        var node = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            node[_i] = arguments[_i];
        }
        if (node.length > 0) {
            if (Rules.isLabelPropsArray(node)) {
                node.forEach(function (l) { return _this.fillLabel(l); });
                return this;
            }
            if (Rules.isNodePropsArray(node)) {
                node.forEach(function (n) { return _this.fillNode(n); });
                return this;
            }
            return this;
        }
        return this;
    };
    return Canvas;
}());
exports.Canvas = Canvas;
