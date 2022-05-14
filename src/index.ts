import 'dotenv/config';
import express from 'express';
import routes from './routes/index';

const app = express();
//const port = process.env.PORT;      // for Prod
const port = 3000;                    //for Testing

const imgList = ["encenadaport.jpg","fjord.jpg", "icelandwaterfall.jpg", "palmtunnel.jpg", "santamonica.jpg" ] // list of images
const imgResized = new Array(imgList.length).fill(0);   //keep track of files resized
const tally : Map<string, Array<string> > = new Map<string, Array<string>> ();  //list starts with zero

app.set('imgList', imgList );           //sharing variables across express routes
app.set('imgResized', imgResized );
app.set('tally', tally);


app.use('/imgApi', routes);     //API route for image resizing


app.listen(port, ()=>{
  console.log(`Server Running at ${port} !`);
});


export default app;