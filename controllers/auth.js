const User = require('../models/user-schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.singUpUser = (req, res) => {
    console.log("SignUp : " + JSON.stringify(req.body))
  
    bcrypt.hash(req.body.password,10).then(hash => {
      const user = new User({
        email:req.body.email,
        password:hash
      })
  
      console.log('Hash : ',hash)
      user.save().then(createdUser => {
        res.status(201).json({
          message: "User created",  
          user: createdUser
        })
      }).catch(err =>{
        res.status(500).json({
          message:err.message
        })
      })
  
    }) 
  }


exports.loginUser = (req, res) => {
    console.log("Login : " + JSON.stringify(req.body))
    User.findOne({email:req.body.email}).then(user =>{
      console.log("user Found :"+JSON.stringify(user))
  
      if(!user){
        res.status(404).json({
          message:"User does not exist"
        })
      }
      return user
    }).then(fetcheduser =>{
      console.log("User Found :"+JSON.stringify(fetcheduser))
  
      bcrypt.compare(req.body.password,fetcheduser.password).then(passMatch =>{
        if(passMatch){
  
          let token = jwt.sign({email:req.body.email, userId: fetcheduser._id },'MU_Secret',{expiresIn :'1h'});
  
          res.status(200).json({
            message:"Login Succesful",
            token:token,
            expiresIn: 3600,
            userId : fetcheduser._id    /*written by me */
          })
        }
        res.status(403).json({
          message:"Invalid UserName/Password"
        })
      })
    })   
  }  
