const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//models
const Director = require('../models/Director');

// get all directors
router.get('/all',(req,res,next)=>{
    const promise = Director.aggregate([
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'directory_id',
                as:'allDirectors'
            }
        },
        {
            $unwind:{
                path:'$allDirectors'
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio',
                },
                movies:{
                    $push:'$allDirectors'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                bio:'$_id.bio',
                movies:'$movies'
            }
        }
    ]);

    promise.then((allDirectors)=>{
        if(!allDirectors)
            next({message:'Director topilmadi',code:123});
        res.json(allDirectors);
    }).catch((err)=>{
        res.json(err);
    })
});

//get best 10 film
router.get('/id/:director_id/best10movie',(req,res,next)=>{
    const promise = Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'directory_id',
                as:'movies',
            }
        },
        {
            $unwind:'$movies'
        },
        {
            $sort:{
                "movies.imdb_score":-1
            }
        },
        { 
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio',
                },
                movies:{
                    $push:'$movies'
                }
            }
        }
        
    ]);
    promise.then((thisDirector)=>{
        if(!thisDirector)
            next({message:'Director topilmadi',code:123});
        res.json(thisDirector);
    }).catch((err)=>{
        res.json(err);
    });
});

// get director by Id
router.get('/id/:director_id',(req,res,next)=>{
    const promise = Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'directory_id',
                as:'directorMovies'
            }
        },
        { 
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio',
                },
                movies:{
                    $push:'$directorMovies'
                }
            }
        }
    ]);
    promise.then((thisDirector)=>{
        if(!thisDirector)
            next({message:'Director topilmadi',code:123});
        res.json(thisDirector);
    }).catch((err)=>{
        res.json(err);
    });
});




//new director
router.post('/new',(req,res,next)=>{
    const newDirector = new Director(req.body);
    const promise = newDirector.save();
    promise.then((director)=>{
        res.json(director);
    }).catch((err)=>{
        res.json(err);
    });
});

//update director
router.put('/update/:director_id',(req,res,next)=>{
    const promise = Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});
    promise.then((updatedDirector)=>{

        res.json(updatedDirector);
    }).catch((err)=>{
        res.json(err);
    });
});

// delete director
router.delete('/delete/:director_id',(req,res,next)=>{
    const promise = Director.findByIdAndRemove(req.params.director_id);
    promise.then(()=>{
        res.json('successfully deleted');
    }).catch((err)=>{
        res.json(err);
    });
});



module.exports = router;