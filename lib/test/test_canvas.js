"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var saber_canvas_1 = require("../core/saber-canvas");
var Rect_1 = require("../core/Rect");
function test_canvas() {
    var size = {
        width: 600,
        height: 600
    };
    var res = new saber_canvas_1.Canvas('test', size.width, size.height)
        .draw(new Rect_1.Node(size.width, size.height))
        .draw(new Rect_1.Label('hello canvas!'))
        .draw(new Rect_1.Sprite('https://ubmcmm.baidustatic.com/media/v1/0f000F_LSh3bh3jmLIlBv6.png')
        .setSize(100, 100)
        .setPosition(100, 100))
        .getImageData(150, 150, 10, 10).data;
    console.log(res);
}
exports.test_canvas = test_canvas;
