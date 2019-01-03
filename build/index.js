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
define("lib/Canvas", ["require", "exports"], function (require, exports) {
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
            if (Rules.isCanvas(canvas)) {
                canvas.width = MaxWidth;
                canvas.height = MaxHeight;
                var ctx = canvas.getContext('2d');
                if (Rules.isCtx(ctx)) {
                    this.ctx = ctx;
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
});
define("lib/Rect", ["require", "exports"], function (require, exports) {
    "use strict";
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
});
define("saber-canvas", ["require", "exports", "lib/Canvas", "lib/Rect"], function (require, exports, Canvas_1, Rect_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Canvas_1);
    __export(Rect_1);
});
define("example/helloworld", ["require", "exports", "lib/Canvas", "lib/Rect"], function (require, exports, Canvas_2, Rect_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new Canvas_2.Canvas('hello', 640, 480)
        .draw(new Rect_2.Node(640, 480))
        .draw(new Rect_2.Label('hello world!').setPosition(300, 20))
        .draw(new Rect_2.Node(100, 200).setColor('blue').setPosition(200, 200));
});
