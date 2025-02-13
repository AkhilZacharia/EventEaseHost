const express = require('express');
const defaultRouter = express.Router(); 
defaultRouter.use(express.json());
defaultRouter.use(express.urlencoded({extended:true}));
const userModel = require('../model/userData');
const userRoleModel = require('../model/userRoleData');
const RoleModel = require('../model/RoleData');
const userKeyModel = require('../model/userKeyData');

const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {encrypt, decrypt} = require('../crypt/crypt');


/***************************route******************/
// Login
defaultRouter.post('/',async (req,res)=>{ 
  console.log(req.body); 
  const user= await userModel.findOne({Email:req.body.Email,approved: true })  
  // console.log('user',user);
  if(!user){
      res.status(404).send({message:'User not found'});
  }
  try{
    const pass= await userKeyModel.findOne({User:user._id.toString()})
    bcrypt.compare(req.body.Password, pass.Password, async (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const role= await userRoleModel.findOne({User:user._id.toString()});
      const userrole= await RoleModel.findOne({RoleId:role.RoleId});
      console.log(userrole.Role);
      ///////////////////
      if (userrole.Role == 'Admin') {
        console.log('hi admin');
        const payload={Email:user.Email,UserName:user.Name,Password:pass.Password,User:user._id.toString(),Role:userrole.Role};
        const token= jwt.sign(payload,'Admin');
        res.status(200).send({message:'Login Successful',key:token}) 
      }
      else if (userrole.Role == 'Organizer') {
        console.log('hi Organizer');
        const payload={Email:user.Email,UserName:user.Name,Password:pass.Password,User:user._id.toString(),Role:userrole.Role};
        const token= jwt.sign(payload,'Organizer');
        res.status(200).send({message:'Login Successful',key:token}) 
      } else {
        console.log('hi user');
        const payload={Email:user.Email,UserName:user.Name,Password:pass.Password,User:user._id.toString(),Role:userrole.Role};
        const token= jwt.sign(payload,'User');
        res.status(200).send({message:'Login Successful',key:token}) 
      }
  })
}catch (error){
  console.log(error);
}
});
    
// register
defaultRouter.post('/add/',async (req,res)=>{ 
    console.log(req.body);
    try {
      const item = {
        Name: req.body.Name,
        Email: req.body.Email
      };
      const defaultdata = new userModel(item);
      const item2 = await defaultdata.save();
      const userid = item2._id.toString();
      const hashedPassword = await bcrypt.hash(req.body.Password, 10);

      const item2Data = {
        Password: hashedPassword,
        User: userid
      };
      const data = new userKeyModel(item2Data);
      await data.save();
      const roledata = await RoleModel.findOne({ Role: req.body.Role });

      const item3 = {
        RoleId: roledata.RoleId,
        User: userid
      };
      console.log('item3', item3);
      const userroledata = new userRoleModel(item3);
      await userroledata.save();
  
      res.send({ message: 'Registration Successful!' });
  } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'An error occurred during registration' });
  }
    });



module.exports = defaultRouter;