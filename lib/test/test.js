"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saber_canvas_1 = require("../core/saber-canvas");
var Rect_1 = require("../core/Rect");
var size = {
    width: 600,
    height: 600
};
new saber_canvas_1.Canvas('test', size.width, size.height)
    .draw(new Rect_1.Node(size.width, size.height))
    .draw(new Rect_1.Label('hello canvas!'));
