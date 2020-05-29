const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();

chai.use(chaiHttp);
/*
describe('*** All directors',()=>{
    it('checking',(done)=>{
        chai.request(server)
            .get('/')
            .end((err,res)=>{
                res.should.have.status(200);
                done();
            });
    });
});
*/