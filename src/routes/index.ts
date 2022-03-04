import express from 'express';
import fs from 'fs';
import util from '../utilities/buildImage'
import path from 'path';
import { callbackify } from 'util';

const routes = express.Router();

routes.get('/', async (req :express.Request,res :express.Response  ) =>{
    //http://127.0.0.1:3000/imgApi?img=[0-4]&width=[150-]&height=[150-]
    // Parse imgNum, outHeight and outWidth from query parameters
    const imgNum = parseInt( req.query.img as string) ? parseInt(req.query.img as string) : 0 ;
    //if new height is missing pick default val
    const outHeight = parseInt(req.query.height as string)? parseInt(req.query.height as string) : 150 ;
    //if new height is missing pick default val
    const outWidth = parseInt(req.query.width as string )? parseInt(req.query.width as string) : 150;
    

    if (util.isValidImgNum(imgNum) ){                   //isValidImg returns zero when valid and 1 when invalid
      console.log("Invalid ImgNum Check !");
      res.status(422).send("Invalid imgNum Value !");
      return;
    }
    if(util.isValidHeight(outHeight) ){
      res.status(422).send("Invalid Height Value !");
      return;
    }
    if(util.isValidWidth(outWidth) ){
      res.status(422).send("Invalid Width Value !");
      return;
    }
      


    const outPath = './images/resized/';
    if(!fs.existsSync(outPath)){
      fs.mkdirSync(outPath, {recursive:true});  
    }

    // getting global variables to keep track of already resized images
    const imgList = req.app.get('imgList');
    const imgResized = req.app.get('imgResized');
    const tally = req.app.get('tally');

    
    console.log("API Starts     !!!\n");
    console.log("req.query.prams(): ",imgNum, outHeight, outWidth );
  
    if((imgResized[imgNum] == 1) && (util.dimProcessedBefore(outWidth, outHeight, imgNum, tally, imgList) == 1 )  ){      //check if already resized and Send response from disk
        
        res.sendFile(path.resolve( outPath+outWidth.toString()+outHeight.toString()+'_'+imgList[imgNum] ));
        console.log("Sending File from Cache !");
    }else{           
      //resize the file and save on disk and send  
      console.log('Creating resized File  !', imgResized);
      
      await util.imageResize("./images/"+imgList[imgNum], outWidth, outHeight, imgNum, imgResized, imgList, tally  );    
    
  
      //send response from data
  
      res.sendFile(path.resolve( outPath+outWidth.toString()+outHeight.toString()+'_'+imgList[imgNum] ));
  
    }
    //Printing tally contents
    console.log(tally.get(imgList[imgNum]) );
    //Logging the picture is processed atleast once  
    imgResized[imgNum] = 1;
  });

  export default routes;