import express from 'express';
import sharp from 'sharp';
import {promises as fsPromises} from 'fs';
import fs from 'fs';
import path from 'path';
import util from './utilities/buildImage';


const app = express();
const port = 3000;

const imgList = ["encenadaport.jpg","fjord.jpg", "icelandwaterfall.jpg", "palmtunnel.jpg", "santamonica.jpg" ]
const imgResized = new Array(imgList.length).fill(0);   //keep track of files resized


const tally : Map<string, Array<string> > = new Map<string, Array<string>> ();  //list starts with zero

app.get('/',(req,res) =>{
  res.send("Reply from Server !");
} );

app.get('/api',(req,res) =>{
  res.status(200).send("Reply from Server !");
} );


app.get('/imgApi', async (req :express.Request,res :express.Response  ) =>{
  //http://127.0.0.1:3000/imgApi?img=[0-4]&width=[150-]&height=[150-]
  // Parse imgNum, outHeight and outWidth from query parameters
  const imgNum = parseInt( req.query.img as string);
  //if new height is missing pick default val
  const outHeight = parseInt(req.query.height as string)? parseInt(req.query.height as string) : 150 ;
  //if new height is missing pick default val
  const outWidth = parseInt(req.query.width as string )? parseInt(req.query.width as string) : 150;
  
  const outPath = './images/resized/';
  if(!fs.existsSync(outPath)){
    fs.mkdirSync(outPath, {recursive:true});  
  }
  
  
  console.log("API Starts     !!!\n");
  console.log("req.query.prams(): ",imgNum, outHeight, outWidth );

  if((imgResized[imgNum] == 1) && (util.dimProcessedBefore(outWidth, outHeight, imgNum, tally, imgList) == 1 )  ){      //check if already resized and Send response from disk
      
      res.sendFile(path.resolve( outPath+outWidth.toString()+outHeight.toString()+'_'+imgList[imgNum] ));
      console.log("Sending File from Cache !");
  }else{           
    //resize the file and save on disk and send  
    console.log('Creating File  !', imgResized);
    
    await util.imageResize("./images/"+imgList[imgNum], outWidth, outHeight, imgNum, imgResized, imgList, tally  );    
  

    //send response from data

    res.sendFile(path.resolve( outPath+outWidth.toString()+outHeight.toString()+'_'+imgList[imgNum] ));

  }
  //Printing tally contents
  console.log(tally.get(imgList[imgNum]) );
  //Logging the picture is processed atleast once  
  imgResized[imgNum] = 1;
});

console.log("Im Here !");
app.listen(port, ()=>{
  console.log(`Server Running at ${port} !`);
});


export default app;