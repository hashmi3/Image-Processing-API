"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = require("fs");
var fs_2 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var buildImage_1 = __importDefault(require("./utilities/buildImage"));
var app = (0, express_1.default)();
var port = 3000;
var imgList = ["encenadaport.jpg", "fjord.jpg", "icelandwaterfall.jpg", "palmtunnel.jpg", "santamonica.jpg"];
var imgResized = new Array(imgList.length).fill(0); //keep track of files resized
//aatype dim =  [width:number, height:number];
var tally = new Map(); //list starts with zero
app.get('/', function (req, res) {
    res.send("Reply from Server !");
});
app.get('/api', function (req, res) {
    res.status(200).send("Reply from Server !");
});
function imageResize(imgPath, width, height, imgNum) {
    return __awaiter(this, void 0, void 0, function () {
        var outPath, arrStr, dimVal, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outPath = './images/resized/';
                    arrStr = [];
                    dimVal = width.toString() + ',' + height.toString();
                    arrStr.push(dimVal);
                    // for first time tally.get() returns undefined. doing this to avoid undefined entry in tally arrays [ '700,700', undefined ]
                    if (imgResized[imgNum] == 0) {
                        tally.set(imgList[imgNum], arrStr);
                    }
                    else {
                        tally.set(imgList[imgNum], arrStr.concat(tally.get(imgList[imgNum])));
                    }
                    return [4 /*yield*/, (0, sharp_1.default)("./images/" + imgList[imgNum]).resize(width, height, { fit: 'inside' }).toBuffer()
                        //const writeDone =  await fsPromises.writeFile(outPath+imgList[imgNum], data);
                    ];
                case 1:
                    data = _a.sent();
                    //const writeDone =  await fsPromises.writeFile(outPath+imgList[imgNum], data);
                    return [4 /*yield*/, fs_1.promises.writeFile(outPath + width.toString() + height.toString() + '_' + imgList[imgNum], data)];
                case 2:
                    //const writeDone =  await fsPromises.writeFile(outPath+imgList[imgNum], data);
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
app.get('/imgApi', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imgNum, outHeight, outWidth, outPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imgNum = parseInt(req.query.img);
                outHeight = parseInt(req.query.height) ? parseInt(req.query.height) : 150;
                outWidth = parseInt(req.query.width) ? parseInt(req.query.width) : 150;
                outPath = './images/resized/';
                if (!fs_2.default.existsSync(outPath)) {
                    fs_2.default.mkdirSync(outPath, { recursive: true });
                }
                console.log("API Starts     !!!\n");
                console.log("req.query.prams(): ", imgNum, outHeight, outWidth);
                if (!((imgResized[imgNum] == 1) && ((0, buildImage_1.default)(outWidth, outHeight, imgNum, tally, imgList) == 1))) return [3 /*break*/, 1];
                res.sendFile(path_1.default.resolve(outPath + outWidth.toString() + outHeight.toString() + '_' + imgList[imgNum]));
                console.log("Sending File from Cache !");
                return [3 /*break*/, 3];
            case 1:
                //resize the file and save on disk and send  
                console.log('Creating File  !', imgResized);
                return [4 /*yield*/, imageResize("./images/" + imgList[imgNum], outWidth, outHeight, imgNum)];
            case 2:
                _a.sent();
                //send response from data
                res.sendFile(path_1.default.resolve(outPath + outWidth.toString() + outHeight.toString() + '_' + imgList[imgNum]));
                _a.label = 3;
            case 3:
                //Printing tally contents
                console.log(tally.get(imgList[imgNum]));
                //Logging the picture is processed atleast once  
                imgResized[imgNum] = 1;
                return [2 /*return*/];
        }
    });
}); });
console.log("Im Here !");
app.listen(port, function () {
    console.log("Server Running at ".concat(port, " !"));
});
exports.default = app;
