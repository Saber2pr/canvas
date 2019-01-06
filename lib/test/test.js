"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas_1 = require("../core/Canvas");
var Rect_1 = require("../core/Rect");
new Canvas_1.Canvas('test', 400, 400)
    .draw(new Rect_1.Node(400, 400))
    .draw(new Rect_1.Label('hello canvas!'));
