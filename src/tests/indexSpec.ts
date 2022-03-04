import exp from "constants";
import supertest from "supertest";
import app from "../index";
import util from "../utilities/buildImage";


describe( "GET /imgApi", ()=> {
    it('expects img = [0-4]', ()=> {
      const imgNum = 4;
      expect(util.isValidImgNum(imgNum) ).toBe(0);
    });

    it('expects width tobe <= 4096', ()=> {
      const width = 4096;
      expect( util.isValidWidth(width) ).toBe(0);
    });

    it('expects height to be <= 2160 ', ()=> {
      const height = 2160;
      expect( util.isValidHeight(height) ).toBe(0);
    });

    it('gets the imgAapi endpoint', async ()=>{
      const res = await supertest(app).get('/imgApi?img=0&width=250&height=250');
      console.log(res.body);
      expect(res.status).toBe(200);  
    });
} );


