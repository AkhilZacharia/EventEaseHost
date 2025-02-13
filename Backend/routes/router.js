const express = require('express');
const router = express.Router(); 
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const userModel = require('../model/userData');
const RoleModel = require('../model/RoleData');
const eventModel = require('../model/eventData');
const jwt= require('jsonwebtoken');


function verifyAdmin(req,res,next){
  let token=req.headers.token;
  try {
    if(!token) throw 'Unauthorised access';
    else{
        let payload=jwt.verify(token,'Admin');
        if(!payload) throw 'Unauthorized access';
        next();                                 
    }
  } catch (error) {
    console.log(error);
  }
  
}

/***************************route******************/

// router.get('/',verifyAdmin, async (req, res) => {
//   try {
//     const userData = await userModel.find();
//     res.send(userData)
//   } catch (error) {
//     res.status(404).send('data not found');
//   }
// });

// router.post('/adduser',verifyAdmin,async (req,res)=>{ 
//                   // console.log(req.body);
//               try{
//                 const item = req.body;
//                 const userdata = new userModel(item);
//                 await userdata.save();
//                 res.status(200).send({message:'Added'});
//               } catch (error) {
//                 res.status(404).send({message:'add UNSuccessful'});
//               }
    
// });

/******edit*******/
router.get('/users',verifyAdmin,async (req,res)=>{ 
  try{

  const UserA = await userModel.find({approved:true,Email:{ $ne:'admin@abc.com'}});
  const UserUn = await userModel.find({approved:false});
  // console.log(UserUn);
  
  res.status(200).send({UserA,UserUn});
  } catch (error){
    res.send({message:'Users not found'});
  }
});

router.get('/approve-user/:id',verifyAdmin,async (req,res)=>{ 
  try{
    
  const Event = await userModel.findByIdAndUpdate(req.params.id,{approved:true});
  console.log(Event);
  
  res.status(200).send({message:'Success'});
  } catch (error){
    res.send({message:' not found'});
  }
});

router.get('/block-user/:id',verifyAdmin,async (req,res)=>{ 
  try{
    
  const Event = await userModel.findByIdAndUpdate(req.params.id,{approved:false});
  console.log(Event);
  res.status(200).send({message:'Success'});
  } catch (error){
    res.send({message:' not found'});
  }
});

router.get('/events',verifyAdmin,async (req,res)=>{ 
  try{
    
  const EventA = await eventModel.find({approved:true});
  const EventUn = await eventModel.find({approved:false});
  console.log(EventUn);
  
  res.status(200).send({EventA,EventUn});
  } catch (error){
    res.send({message:'Users not found'});
  }
});

router.get('/approve-event/:id',verifyAdmin,async (req,res)=>{ 
  try{
    
  const Event = await eventModel.findByIdAndUpdate(req.params.id,{approved:true});
  console.log(Event);
  
  res.status(200).send({message:'Success'});
  } catch (error){
    res.send({message:' not found'});
  }
});

router.get('/block-event/:id',verifyAdmin,async (req,res)=>{ 
  try{
    
  const Event = await eventModel.findByIdAndUpdate(req.params.id,{approved:false});
  console.log(Event);
  res.status(200).send({message:'Success'});
  } catch (error){
    res.send({message:' not found'});
  }
});
/**** delete ***/
router.delete('/delete/:id',verifyAdmin, async (req, res) => {
  try {
    const eventdata = await eventModel.findByIdAndDelete(req.params.id);
    res.send({message:'Deleted'})
  } catch (error) {
    res.status(404).send({message:'Delete UNSuccessful'});
  }
});

router.delete('/delete/user/:id',verifyAdmin, async (req, res) => {
  try {
   const userdata = await userModel.findByIdAndDelete(req.params.id);
    res.send({message:'Deleted'})
  } catch (error) {
    res.status(404).send({message:'Delete UNSuccessful'});
  }
});

// router.put('/edit/:id',verifyAdmin, async (req,res)=>{
//     try{
//       const userdata = await userModel.findByIdAndUpdate(req.params.id, req.body);
//       res.send({message:'updated'});
//     } catch (error) {
//       res.send('user not found');
//     }
// });

router.get('/home/',verifyAdmin, async (req, res) => {
try {
   const Data = await eventModel.find({approved:true});
  //  console.log(Data)
   res.send(Data)
} catch (error) {
  res.status(404).send('data not found');
}
});



module.exports = router;