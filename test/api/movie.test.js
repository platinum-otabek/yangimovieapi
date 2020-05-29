const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
const should = chai.should();

chai.use(chaiHttp);

let token,movie_id;

describe(' *** Check all movie methods ****',()=>{
    before((done)=>{
        chai.request(server)
            .post('/authenticate')
            .send({username:'admin', password:'12345'})
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
    });
    // get all movies
    describe(' *** Get movies',()=>{
        it('1.get all movies -> /api/movie/all',(done)=>{
            chai.request(server)
                .get('/api/movie/all')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    // Post new movie
    describe(' *** add new movie',()=>{
        it('2.add new movie',(done)=>{
            const newmovie = {
                directory_id:'5ed0766d42c1a071634a1876',
                title:'Test',
                category:'Test',
                country:'Test',
                year:2000,
                imdb_score:7,
                
            }
            chai.request(server)
                .post('/api/movie/new')
                .send(newmovie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('directory_id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movie_id = res.body._id;
                    done();
                })
        })
    });
    // get movie by Id 
    /*
    describe(' *** get movie by id',()=>{
        it('3.get movie by movie_id',(done)=>{
            chai.request(server)
                .get('/api/movie/id/' + movie_id)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('title');
                    // res.body.should.have.property('directory_id');
                    // res.body.should.have.property('category');
                    // res.body.should.have.property('country');
                    // res.body.should.have.property('year');
                    // res.body.should.have.property('imdb_score');
                    // res.body.should.have.property('_id').eql(movie_id);
                    done();
                });
        });
    });
*/
    describe('/PUT/movie_id movie',()=>{
        it('should PUT a movie -> /api/movie/movie_id',(done)=>{
            const updatedMovie = {
                title:"TESTTT",
                directory_id:"5ed0766d42c1a071634a1876",
                category:"Test",
                country:"TEST",
                year:1,
                imdb_score:1
            }
            chai.request(server)
                .put('/api/movie/update/' + movie_id)
                .send(updatedMovie)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(updatedMovie.title);
                    res.body.should.have.property('directory_id').eql(updatedMovie.directory_id);
                    res.body.should.have.property('category').eql(updatedMovie.category);
                    res.body.should.have.property('country').eql(updatedMovie.country);
                    res.body.should.have.property('year').eql(updatedMovie.year);
                    res.body.should.have.property('imdb_score').eql(updatedMovie.imdb_score);
                    done();
                });
        });
    });

    describe('Delete ',()=>{
        it('/api/movie/delete/',(done)=>{
            chai.request(server)
                .delete('/api/movie/delete/' + movie_id)
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                })
        })
    })
});