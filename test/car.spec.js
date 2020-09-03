const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Users API', () => {

    describe("GET /cars", ()=>{
        it("It should get all the cars details", (done)=>{
            chai.request(server)
                .get("/cars") //Correct URL 
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
        it("It should not get the cars details", (done)=>{
            chai.request(server)
                .get("/car") //Wrong URL
                .end((err, response)=>{
                    response.should.have.status(404);
                done();
                })
        })
    })  

    describe("GET /cars/username", ()=>{
        it("It should get car by username", (done)=>{
            const id = 'gopibn'; //Correct Username
            const car = {
                "carBrand": "Maruti Suzuki",
                "carType": "Hatchback",
                "color": "Red",
                "year" : "2008"
            }
            chai.request(server)
                .get("/cars/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('username');
                    response.body.should.have.property('carBrand');
                    response.body.should.have.property('carType');
                    response.body.should.have.property('color');
                    response.body.should.have.property('year');
                    response.body.should.have.property('carID');
                    response.body.should.have.property('carImage');
                    response.body.should.have.property('username').eq('gopibn');
                done();
                }
                )
        })

        it("It should not get car by invalid username", (done)=>{
            const id = 'gopi';  //wrong username
            chai.request(server)
                .get("/cars/"+id)
                .end((err, response)=>{
                    response.should.have.status(404);
                    response.body.should.be.a('object');
                    // response.text.should.be.eq("User not found with provided username");
                done();
                })
        })
    })

    describe("GET /cars/carBrand", ()=>{

        // it("It should get car by Car Brand", (done)=>{
        //     const id = 'Maruti'; //Correct Username
        //     chai.request(server)
        //         .get("/cars/"+id)
        //         .end((err, response)=>{
        //             response.should.have.status(200);
        //             response.body.should.be.a('object');
        //             response.body.should.have.property('username');
        //             response.body.should.have.property('carBrand').eq('Maruti');
        //             response.body.should.have.property('carType');
        //             response.body.should.have.property('color');
        //             response.body.should.have.property('year');
        //             response.body.should.have.property('carID');
        //             response.body.should.have.property('carImage');
        //         done();
        //     })
        // })

        // it("It should not get car by invalid Car Brand", (done)=>{
        //     const id = 'Land';  //wrong username
        //     chai.request(server)
        //         .get("/cars/"+id)
        //         .end((err, response)=>{
        //             response.should.have.status(404);
        //             response.body.should.be.a('object');
        //             // response.text.should.be.eq("User not found with provided username");
        //         done();
        //         })
        // })
    })

    describe("GET /cars/carID", ()=>{

        // it("It should get car by Car ID", (done)=>{
        //     const id = 2443598052 ; //Correct Car ID
        //     chai.request(server)
        //         .get("/cars/carID/"+id)
        //         .end((err, response)=>{
        //             response.should.have.status(200);
        //             response.body.should.be.a('object');
        //             response.body.should.have.property('username');
        //             response.body.should.have.property('carBrand');
        //             response.body.should.have.property('carType');
        //             response.body.should.have.property('color');
        //             response.body.should.have.property('year');
        //             response.body.should.have.property('carID').eq(2443598052);
        //             response.body.should.have.property('carImage');
        //         done();
        //     })
        // })

        // it("It should not get car by invalid Car ID", (done)=>{
        //     const id = 244359805;  //wrong username
        //     chai.request(server)
        //         .get("/cars/"+id)
        //         .end((err, response)=>{
        //             response.should.have.status(404);
        //             response.body.should.be.a('object');
        //             // response.text.should.be.eq("User not found with provided username");
        //         done();
        //         })
        // })
    })

    describe("POST /cars/add", ()=>{

        it("Adding a car with all property", (done)=>{
            const carData = {
                "username":"niharika",
                "carBrand": "Crossover",
                "carType": "Volvo",
                "color": "Gray",
                "year" : 2005
            };
            chai.request(server)
                .post("/cars/add")
                .send(carData)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('carBrand').eq('Crossover');
                    response.body.should.have.property('carType').eq('Volvo');
                    response.body.should.have.property('color').eq('Gray');
                    response.body.should.have.property('year').eq(2005);
                    response.body.should.have.property('username').eq('niharika');
                done();
                })
        })

        it("It should not add the cars details due to wrong url", (done)=>{
            chai.request(server)
                .get("/car/add") //Wrong URL
                .end((err, response)=>{
                    response.should.have.status(404);
                done();
                })
        })

    })

    describe("PUT /cars/carID", ()=>{

        it("Updating existing car details", (done)=>{
            const id = 7804409709; //Correct Username
            const carData = 
            {
                "username": "gopibn",
                "carBrand": "Land Rover",
                "carType": "Sedan",
                "year": 2012,
                "color": "Blue",
                "carImage": null,
                "carID": 7804409709
            };
            chai.request(server)
                .put("/cars/"+id)
                .send(carData)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('carBrand').eq('Land Rover');
                    response.body.should.have.property('carType').eq('Sedan');
                    response.body.should.have.property('year').eq(2012);
                    response.body.should.have.property('color').eq('Blue');
                    response.body.should.have.property('carImage').eq(null);
                done();
                })
        })

        it("Inavlid Car ID", (done)=>{
            const id = 7804409710; //Correct Username
            const carData = 
            {
                "username": "gopibn",
                "carBrand": "Land_Rover",
                "carType": "Sedan",
                "year": 2012,
                "color": "Blue",
                "carImage": null,
                "carID": 7804409709
            };
            chai.request(server)
                .put("/cars/"+id)
                .send(carData)
                .end((err, response)=>{
                    response.should.have.status(400);
                    done();
                })
        })

    })

    describe("DELETE /cars/username", ()=>{

        it("Deleting existing car details", (done)=>{
            const id = 'niharika'; //Correct Username
            chai.request(server)
                .delete("/cars/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.have.property('message').eql('Removed car Successfully');
                done();
                })
        })

        it("It should not Delete existing car details", (done)=>{
            const id = 'chirala'; //Correct Username
            chai.request(server)
                .delete("/cars/"+id)
                .end((err, response)=>{
                    response.should.have.status(200);
                done();
                })
        })
    }) 


})