import supertest from "supertest";
import app from "../index";


describe( "GET / ", ()=> {
    it('gets the api root endpoint', async ()=>{
      const res = await supertest(app).get('/');
      console.log(res.body);
      expect(res.status).toBe(200);  
    })
} );
describe( "GET / imgApi", ()=> {
    it('gets the imgAapi endpoint', async ()=>{
      const res = await supertest(app).get('/imgApi?img=0&width=250&height=250');
      console.log(res.body);
      expect(res.status).toBe(200);  
    })
} );


