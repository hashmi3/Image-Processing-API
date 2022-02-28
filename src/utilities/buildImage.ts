
import {promises as fsPromises} from 'fs';
import sharp from 'sharp';

async function imageResize (imgPath: string, width : number, height: number, imgNum: number, imgResized: Array<number>, imgList: Array<string>, tally: Map<string, Array<string>> ) {
    
  const outPath = './images/resized/';

  const arrStr: Array<string> = [];
  const dimVal = width.toString()+','+height.toString();    //For str '700,500' = 'width,height'
  arrStr.push(dimVal);

  // for first time tally.get() returns undefined. doing this to avoid undefined entry in tally arrays [ '700,700', undefined ]
  if(imgResized[imgNum] == 0){
    tally.set(imgList[imgNum], arrStr );
  }else{
    tally.set(imgList[imgNum], arrStr.concat(tally.get(imgList[imgNum]) as Array<string> ) );
  }  

  const data = await sharp("./images/"+imgList[imgNum]).resize( width, height, {fit:'inside'} ).toBuffer()
  
  //const writeDone =  await fsPromises.writeFile(outPath+imgList[imgNum], data);
  await fsPromises.writeFile(outPath+width.toString()+height.toString()+'_'+imgList[imgNum], data);

}



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

export default {imageResize, dimProcessedBefore};