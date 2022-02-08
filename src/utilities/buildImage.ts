


function dimProcessedBefore(width: number, height: number, imgNum: number, tally: Map<string, Array<string>>, imgList:Array<string> ){
  const arr = tally.get(imgList[imgNum]);
  //parse throught arr to find match for width and height
  //return 1 if found else 0
  let found = 0;
  (arr as Array<string>).forEach((x:string)=> {
    const val = x.split(',');
    if (val[0] == width.toString() && val[1] == height.toString() ){
      console.log("Found match for width and height in prev. Log !", val);
      found = 1;
      //break;
    }
  } );
  if (found == 1){
    return 1;
  }
  console.log("Previous dim Processed: ", arr, (arr as string[]).length);
  return 0;
}

export default dimProcessedBefore;