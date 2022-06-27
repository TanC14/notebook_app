const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Doitright'
var fetchuser = require('../middleware/fetchuser')



//Route 1//Create a user using: POST"/api/auth/createuser" , doesnt require auth
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a unique email').isEmail(),
    body('password',' Password must be 8 characters').isLength({ min: 8 }),
], async(req,res)=>{
    let success = false;
    //if errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

//check user exists already with same email
try{


let user = await User.findOne({email:req.body.email})
if(user){
    return res.status(400).json({success, error: 'Sorry a user with this email already exists'})
}
const salt = await bcrypt.genSalt(10);
secPass = await bcrypt.hash(req.body.password,salt);
//create user
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
          user:{
              id:user.id
          }
      }
     const authtoken = jwt.sign(data,JWT_SECRET);
     
success = true;
   res.json({success, authtoken})
}catch(error){
console.error(error.message);
res.status(500).send("Some error occurred")
}
})
//Route-2 //Authenticate a user using: POST"/api/auth/login" , doesnt require login
router.post('/login',[
    body('email','Enter a unique email').isEmail(),
    body('password','Password cannot be blank').exists(),
  
], async(req,res)=>{
     //if errors return bad request
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     const {email,password} = req.body;
     try{
         let user = await User.findOne({email});
         if(!user){
             success = false;
             return res.status(400).json({success, error:"Please try to login with correct credentials"})
         }
         const passwordCompare = await bcrypt.compare(password,user.password);
         if(!passwordCompare){
             success = false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"})
         }
         const data = {
            user:{
                id:user.id
            }
        }
       const authtoken = jwt.sign(data,JWT_SECRET);
       
    success = true;
     res.json({ success, authtoken})
        
     }catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occurred")
     }
  
})
//Route-3//Get logged in user details POST"/api/auth/getuser",login required
router.post('/getuser',fetchuser, async(req,res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occurred")
}
})


module.exports = router