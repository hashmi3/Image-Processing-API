"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var port = 3000;
var imgList = ["encenadaport.jpg", "fjord.jpg", "icelandwaterfall.jpg", "palmtunnel.jpg", "santamonica.jpg"]; // list of images
var imgResized = new Array(imgList.length).fill(0); //keep track of files resized
var tally = new Map(); //list starts with zero
app.set('imgList', imgList); //sharing variables across express routes
app.set('imgResized', imgResized);
app.set('tally', tally);
app.get('/', function (req, res) {
    res.status(200).send("Reply from Server !");
});
app.get('/api', function (req, res) {
    res.status(200).send("Reply from Server !");
});
app.use('/imgApi', index_1.default); //API route for image resizing
app.listen(port, function () {
    console.log("Server Running at ".concat(port, " !"));
});
exports.default = app;
