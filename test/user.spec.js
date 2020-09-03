const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Users API', () => {

    describe("GET /users", ()=>{
        it("It should get all the users", (done)=>{
            chai.request(server)
                .get("/users") //Correct URL 
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    // response.body.length.should.be.eq(6);
                done();
                })
        })
        it("It should not get the users", (done)=>{
            chai.request(server)
                .get("/user") //Wrong URL
                .end((err, response)=>{
                    response.should.have.status(404);
                done();
                })
        })
    })    

    describe("GET /users/username", ()=>{
        it("It should get user by username", (done)=>{
            const id = 'gopibn'; //Correct Username
            chai.request(server)
                .get("/users/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('username');
                    response.body.should.have.property('firstName');
                    response.body.should.have.property('lastName');
                    response.body.should.have.property('email');
                    response.body.should.have.property('contactNo');
                    response.body.should.have.property('createdDate');
                    response.body.should.have.property('username').eq('gopibn');
                done();
                }
                )
        })

        it("It should not get user by provided username", (done)=>{
            const id = 'gopi';  //wrong username
            chai.request(server)
                .get("/users/"+id)
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    response.text.should.be.eq("User not found with provided username");
                done();
                })
        })
    })
    
    describe("POST /users/register", ()=>{

        it("Creating new user with all property", (done)=>{
            const userData = {
                "firstName": "Kiran",
                "lastName": "Kumar",
                "email": "kiran@gmail.com",
                "contactNo":"9428654321",
                "username": "Kirank",
                "password" : "Kiran12345",
                "confirmPassword" : "Kiran12345"              
                };
            chai.request(server)
                .post("/users/register")
                .send(userData)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('firstName').eq('Kiran');
                    response.body.should.have.property('lastName').eq('Kumar');
                    response.body.should.have.property('email').eq('kiran@gmail.com');
                    response.body.should.have.property('contactNo').eq(9428654321);
                    response.body.should.have.property('username').eq('kirank');
                done();
                })
        })

        it("It should not create new user without First Name property", (done)=>{
            const userData1 = {
                "lastName": "Kumar",
                "email": "gagan@gmail.com",
                "contactNo":"9876122345",
                "username": "gagang",
                "password" : "Gagan12345",
                "confirmPassword" : "Gagan12345"              
                };
            chai.request(server)
                .post("/users/register")
                .send(userData1)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new user without Last Name property", (done)=>{
            const userData1 = {
                "firstName":"Gagan",
                "email": "gagan@gmail.com",
                "contactNo":"9876122345",
                "username": "gagang",
                "password" : "Gagan12345",
                "confirmPassword" : "Gagan12345"              
                };
            chai.request(server)
                .post("/users/register")
                .send(userData1)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new user without Email property", (done)=>{
            const userData1 = {
                "firstName":"Gagan",
                "lastName":"kumar",
                "contactNo":"9876122345",
                "username": "gagang",
                "password" : "Gagan12345",
                "confirmPassword" : "Gagan12345"              
                };
            chai.request(server)
                .post("/users/register")
                .send(userData1)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new user without Contact Number property", (done)=>{
            const userData1 = {
                "firstName":"Gagan",
                "lastName":"kumar",
                "email": "gagan@gmail.com",
                "username": "gagang",
                "password" : "Gagan12345",
                "confirmPassword" : "Gagan12345"              
                };
            chai.request(server)
                .post("/users/register")
                .send(userData1)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })
        
        it("It should not create new user without Password and Confirm passowrd property", (done)=>{
            const userData1 = {
                "firstName":"Gagan",
                "lastName":"kumar",
                "email": "gagan@gmail.com",
                "contactNo":"9876122345",
                "username": "gagang"            
                };
            chai.request(server)
                .post("/users/register")
                .send(userData1)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("It should not create new user without Username property", (done)=>{
            const userData1 = {
                "firstName":"Gagan",
                "lastName": "Kumar",
                "email": "gagan@gmail.com",
                "contactNo":"9876122345",
                "password" : "Gagan12345",
                "confirmPassword" : "Gagan12345"              
                };
            chai.request(server)
                .post("/users/register")
                .send(userData1)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })
        })

        it("Userame should be between 3 and 20 characters", (done)=>{
            const userData = {
                "firstName":"Gagan",
                "lastName": "Kumar",
                "email": "gagan@gmail.com",
                "username":"gg",
                "contactNo":"9876122345",
                "password" : "Gagan12345",
                "confirmPassword" : "Gagan12345" 
            };
            chai.request(server)
                .post("/users/register")
                .send(userData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })        
  
        })

        it("Userame should contain only alpha-numeric characters only", (done)=>{
            const userData = {
                "firstName":"Gagan",
                "lastName": "Kumar",
                "email": "gagan@gmail.com",
                "username":"gagan@12345",
                "contactNo":"9876122345",
                "password" : "Gagan12345",
                "confirmPassword" : "Gagan12345" 
            };
            chai.request(server)
                .post("/users/register")
                .send(userData)
                .end((err, response)=>{
                    response.should.have.status(400);
                done();
            })        
  
        })
        
    })

    describe("PUT /users/username", ()=>{

        it("Updating existing user", (done)=>{
            const id = 'arunadr'; //Correct Username
            const userData = {
                "firstName": "Aruna",
                "lastName": "R",
                "email": "arunadr@gmail.com",
                "contactNo":"9743383018",
                "username": "arunadr",
                "password" : "Aruna12345",
                "confirmPassword" : "Aruna12345"
            };
            chai.request(server)
                .put("/users/"+id)
                .send(userData)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('firstName').eq('Aruna');
                    response.body.should.have.property('lastName').eq('R');
                    response.body.should.have.property('email').eq('arunadr@gmail.com');
                    response.body.should.have.property('contactNo').eq(9743383018);
                    response.body.should.have.property('username').eq('arunadr');
                done();
                })
        })

        it("Should update existing user only when contact number is exactly 10 numbers ", (done)=>{
            const id = 'vidhya'; //Correct Username
            const userData = {
                "firstName": "Vidhya",
                "lastName": "Bhaki",
                "email": "vidhya@gmail.com	",
                "contactNo":"91863242",
                "username": "vidhya",
                "password" : "Vidhya12345",
                "confirmPassword" : "Vidhya12345"
            };
            chai.request(server)
                .put("/users/"+id)
                .send(userData)
                .end((err, response)=>{
                    response.should.have.status(400);
                    done();
                })
        })

        it("User Not found ", (done)=>{
            const id = 'arun'; //Inavalid Username
            const userData = {
                "firstName": "Vidhya",
                "lastName": "Bhaki",
                "email": "vidhya@gmail.com	",
                "contactNo":"91863242",
                "username": "vidhya",
                "password" : "Vidhya12345",
                "confirmPassword" : "Vidhya12345"
            };
            chai.request(server)
                .put("/users/"+id)
                .send(userData)
                .end((err, response)=>{
                    response.should.have.status(400);
                    response.body.should.have.property('message').eql('User not found');
                done();
                })
        })
    })

    describe("DELETE /users/username", ()=>{

        it("Deleting existing user", (done)=>{
            const id = 'Kirank'; //Correct Username
            chai.request(server)
                .delete("/users/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.have.property('message').eql('Deleted Successfully');
                done();
                })
        })

        it("It should not Delete existing user", (done)=>{
            const id = 'chirala'; //Correct Username
            chai.request(server)
                .delete("/users/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                done();
                })
        })
    })    

    describe('POST /login', function() {

        it('It Should login successfully', (done) => {
            chai.request(server)
                .post('/users/authenticate/')
                .send({username: 'gopibn', password: 'Gopi12345'})
                .end((err, response) => {
                    response.should.have.status(200);
                done();
            })
        });

        it('It Should not login successfully due to wrong credentials', (done) => {
            chai.request(server)
                .post('/users/authenticate/')
                .send({username: 'gopib', password: 'Gopi12345'})
                .end((err, response) => {
                    response.should.have.status(500);
                done();
            })
        });

    });

})