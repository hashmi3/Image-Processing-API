import supertest from "supertest";
import app from "../index";

//const request = supertest(app);

//const agent = supertest(app);

describe( "GET / api", ()=> {
    it('gets the api root endpoint', async ()=>{
      const res = await supertest(app).get('/api');
      console.log(res.body);
      expect(res.status).toBe(200);  
    })
} );



/*describe('GET /api', () => {
    it(' gets the api endpoint', (done)=>{
        return supertest(app).get('/api').expect(200).then( (response)=> {
            done();
        } ).catch(err => done())
    });
} );
*/


/*describe('Test GET/ endpoint response', () => {
    
    const status = 0;
    const body_val = "";
    const data = {status,  body_val};
    beforeAll( (done)=> {
        request.get("/", (x) => {
        //request.get("http:localhost:3000/api", (x) => {
            console.log(x);
            data.status = x.Response.statusCode;
            data.body_val = x.body;
            done();
        } );
    }); 

    it("expect status to be 200",()=>{
        expect(data.status).toBe(200);
    } );

    /*it('gets the api endpoint', async (done) => {
        const response = await request.get('http://localhost:3000/api');
        expect(response.status).toBe(200);
        done();
    } );
    */
//} );
