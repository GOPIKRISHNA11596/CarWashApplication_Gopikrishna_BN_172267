const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Washer API', () => {
    describe("GET /washers", ()=>{
        it("It should get all the Washers", (done)=>{
            chai.request(server)
                .get("/washers") //Correct URL 
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
        it("It should not get the washers", (done)=>{
            chai.request(server)
                .get("/washer") //Wrong URL
                .end((err, response)=>{
                    response.should.have.status(404);
                done();
                })
        })
    }) 

    describe("GET /washers/username", ()=>{
        it("It should get washer by username", (done)=>{
            const id = 'dilip'; //Correct Username
            chai.request(server)
                .get("/washers/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('username');
                    response.body.should.have.property('Name');
                    response.body.should.have.property('company');
                    response.body.should.have.property('email');
                    response.body.should.have.property('contactNo');
                    response.body.should.have.property('createdDate');
                    response.body.should.have.property('username').eq('dilip');
                done();
                }
                )
        })

        it("It should not get washer by provided username", (done)=>{
            const id = 'dili';  //wrong username
            chai.request(server)
                .get("/washers/"+id)
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.text.should.be.eq("Washer not found with provided username");
                done();
                })
        })
    })

    describe("POST /washers/register", ()=>{

        it("Creating new washer with all property", (done)=>{
            const washerData = {
                "Name": "Washer",
                "company": "Washer Company",
                "email": "washer@gmail.com",
                "contactNo":"9428654321",
                "username": "Washer",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
                };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('Name').eq('Washer');
                    response.body.should.have.property('company').eq('Washer Company');
                    response.body.should.have.property('email').eq('washer@gmail.com');
                    response.body.should.have.property('contactNo').eq(9428654321);
                    response.body.should.have.property('username').eq('washer');
                done();
                })
        })

        it("It should not create new washer without  Name property", (done)=>{
            const washerData = {
                "company": "Washer Company",
                "email": "washer@gmail.com",
                "contactNo":"9428654321",
                "username": "Washer",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
                };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new washer without company name property", (done)=>{
            const washerData = {
                "Name": "Washer",
                "email": "washer@gmail.com",
                "contactNo":"9428654321",
                "username": "Washer",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
            };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new washer without Email property", (done)=>{
            const washerData = {
                "Name": "Washer",
                "company": "Washer Company",
                "contactNo":"9428654321",
                "username": "Washer",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
            };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new washer without Contact Number property", (done)=>{
            const washerData = {
                "Name": "Washer",
                "company": "Washer Company",
                "email": "washer@gmail.com",
                "username": "Washer",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
            };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })
        
        it("It should not create new washer without Password and Confirm passowrd property", (done)=>{
            const washerData = {
                "Name": "Washer",
                "company": "Washer Company",
                "email": "washer@gmail.com",
                "contactNo":"9428654321",
                "username": "Washer"             
            };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new washer without Username property", (done)=>{
           const washerData = {
                "Name": "Washer",
                "company": "Washer Company",
                "email": "washer@gmail.com",
                "contactNo":"9428654321",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
            };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("Userame of washer should be between 3 and 20 characters", (done)=>{
            const washerData = {
                "Name": "Washer",
                "company": "Washer Company",
                "email": "washer@gmail.com",
                "contactNo":"9428654321",
                "username": "Wa",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
            };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })        
        })

        it("Userame should contain only alpha-numeric characters only", (done)=>{
            const washerData = {
                "Name": "Washer",
                "company": "Washer Company",
                "email": "washer@gmail.com",
                "contactNo":"9428654321",
                "username": "Washer#@12345",
                "password" : "Washer12345",
                "confirmPassword" : "Washer12345"              
            };
            chai.request(server)
                .post("/washers/register")
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })        
        })
        
    })

    describe("PUT /washers/username", ()=>{

        it("Updating existing washer", (done)=>{
            const id = 'dinesh'; //Correct Username
            const washerData = {
                "Name": "Dinesh kumar Chowdary",
                "email": "dinesh@gmail.com",
                "company" : "Dinesh Car Wash",
                "contactNo":"8796424325",
                "username": "dinesh",
                "password" : "Dinesh12345",
                "confirmPassword" : "Dinesh12345"
            };
            chai.request(server)
                .put("/washers/"+id)
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('Name').eq('Dinesh kumar Chowdary');
                    response.body.should.have.property('company').eq('Dinesh Car Wash');
                    response.body.should.have.property('email').eq('dinesh@gmail.com');
                    response.body.should.have.property('contactNo').eq(8796424325);
                    response.body.should.have.property('username').eq('dinesh');
                done();
                })
        })

        it("Should update existing washer only when contact number is exactly 10 numbers ", (done)=>{
            const id = 'vidhya'; //Correct Username
            const washerData = {
                "Name": "Dinesh kumar",
                "email": "dinesh@gmail.com",
                "company" : "Dinesh Car Wash",
                "contactNo":"87964",
                "username": "dinesh",
                "password" : "Dinesh12345",
                "confirmPassword" : "Dinesh12345"
            };
            chai.request(server)
                .put("/washers/"+id)
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                    done();
                })
        })

        it("User Not found ", (done)=>{
            const id = 'arun'; //Inavalid Username
            const washerData = {
                "Name": "Dinesh kumar",
                "email": "dinesh@gmail.com",
                "company" : "Dinesh Car Wash",
                "contactNo":"8796434567",
                "username": "dinesh",
                "password" : "Dinesh12345",
                "confirmPassword" : "Dinesh12345"
            };
            chai.request(server)
                .put("/users/"+id)
                .send(washerData)
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.body.should.have.property('message').eql('User not found');
                done();
                })
        })
    })

    describe("DELETE /washers/username", ()=>{

        it("Deleting existing washer", (done)=>{
            const id = 'Washer'; //Correct Username
            chai.request(server)
                .delete("/washers/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.have.property('message').eql('Deleted Successfully');
                done();
                })
        })

        it("It should not Delete existing user", (done)=>{
            const id = 'chirala'; //Correct Username
            chai.request(server)
                .delete("/washers/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                done();
                })
        })
    })  

    describe('POST /login', function() {

        it('It Should login successfully', (done) => {
            chai.request(server)
                .post('/washers/authenticate/')
                .send({username: 'dinesh', password: 'Dinesh12345'})
                .end((err, response) => {
                    response.should.have.status(200);
                done();
            })
        });

        it('It Should not login successfully due to wrong credentials', (done) => {
            chai.request(server)
                .post('/washers/authenticate/')
                .send({username: 'dines', password: 'Dinesh1345'})
                .end((err, response) => {
                    response.should.have.status(500);
                done();
            })
        });

    });

})