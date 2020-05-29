const expess = require('express');
const router = expess.Router();
const mongoose = require('mongoose');

//Models
const Movie = require('../models/Movie');

//all mocies with directors
router.get('/all',(req,res,next)=>{
    const promise = Movie.aggregate([
        {
            $lookup:{
                from:'directors',
                localField:'directory_id',
                foreignField:'_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies'
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    title:'$title',
                    category:'$category',
                    country:'$country',
                    year:'$year',
                    imdb_score:'$imdb_score',
                    created_at:'$created_at',
                    directory_id:'$directory_id'
                },
                movies:{
                    $push: '$movies'
                }
            }
        }
    ]);
    promise.then((movies)=>{
        if(!movies)
            next({message:'Movie topilmadi',code:123});
        res.json(movies);
    }).catch((err)=>{
        res.json(err);
    });
});
//get id movie
router.get('/id/:movie_id',(req,res,next)=>{
    const promise = Movie.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.movie_id)
            }
        },
        {
            $lookup:{
                from:'directors',
                localField:'directory_id',
                foreignField:'_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies'
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    title:'$title',
                    category:'$category',
                    country:'$country',
                    year:'$year',
                    imdb_score:'$imdb_score',
                    created_at:'$created_at',
                    directory_id:'$directory_id'
                },
                movies:{
                    $push: '$movies'
                }
            }
        }
    ]);
    promise.then((movies)=>{
        if(!movies)
            next({message:'Movie topilmadi',code:123});
        res.json(movies);
    }).catch((err)=>{
        res.json(err);
    });
});

//top10
router.get('/top10',(req,res,next)=>{
    const promise = Movie.find({}).sort({'imdb_score':-1}).limit(10);
    promise.then((movies)=>{
        if(!movies)
            next({message:'Movie topilmadi', code:123})
        res.json(movies);
    }).catch((err)=>{
        res.json(err);
    });
});

//between start_year -> end_year

router.get('/between/:start_year/:end_year',(req,res,next)=>{
    const { start_year, end_year} = req.params;
    const promise = Movie.find({
        year:{
            $gte:parseInt(start_year),
            $lte:parseInt(end_year)
        }
    });
    promise.then((movies)=>{
        if(!movies)
            next({message:'Movie topilmadi', code:123})
        res.json(movies);
    }).catch((err)=>{
        res.json(err);
    });
})



//new movie
router.post('/new',(req,res,next)=>{
    const newMovie = new Movie(req.body);
    const promise = newMovie.save();
    promise.then((newMovie)=>{
        res.json(newMovie);
    }).catch((err)=>{
        res.json(err);
    });
});

// update movie
router.put('/update/:movie_id',(req,res,next)=>{
    const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});
    promise.then((updatedMovie)=>{
        res.json(updatedMovie);
    }).catch((err)=>{
        res.json(err);
    });
});

//remove movie
router.delete('/delete/:movie_id',(req,res,next)=>{
    const promise = Movie.findByIdAndDelete(req.params.movie_id);
    promise.then(()=>{
        res.json({ status:1,message:'successfully deleted'});
    }).catch((err)=>{
        res.json(err);
    });
});



module.exports = router;