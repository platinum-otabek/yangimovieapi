const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//models
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res,next)=>{
  const {password, username} = req.body  
  bcrypt.hash(password,10).then((hash)=>{
    const user = new User({
      username,
      password:hash
    });
    const promise = user.save();
    promise
      .then((data)=>{res.json(data);})
      .catch((err)=>{res.json(err);});
  });
});

router.post('/authenticate',(req,res,next)=>{
    const {username,password} = req.body;
    User.findOne({username},(err,user)=>{
      if(err) throw err;
      if(!user){
        res.json({
          status:false,
          message:"Authentication failed, user not found"
        });
      }else{
        bcrypt.compare(password,user.password).then( (result) => {
          if(!user){
            res.json({
              status:false,
              message:"Authentication failed, user not found"
            })
          }else{
            const payload = {
              username
            };
            const token = jwt.sign(payload,req.app.get('api_secret_key'),{
              expiresIn:1200
            });
            res.json({
              status:true,
              token
            })
          }
        })
      }
    })
})


module.exports = router;
