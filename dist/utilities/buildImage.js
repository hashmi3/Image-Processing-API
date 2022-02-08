"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dimProcessedBefore(width, height, imgNum, tally, imgList) {
    var arr = tally.get(imgList[imgNum]);
    //parse throught arr to find match for width and height
    //return 1 if found else 0
    var found = 0;
    arr.forEach(function (x) {
        var val = x.split(',');
        if (val[0] == width.toString() && val[1] == height.toString()) {
            console.log("Found match for width and height in prev. Log !", val);
            found = 1;
            //break;
        }
    });
    if (found == 1) {
        return 1;
    }
    console.log("Previous dim Processed: ", arr, arr.length);
    return 0;
}
exports.default = dimProcessedBefore;
