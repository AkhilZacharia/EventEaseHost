const express = require('express');
const userRouter = express.Router(); 
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended:true}));
const userModel = require('../model/userData');
const eventModel = require('../model/eventData');
const bookingModel = require('../model/bookingData');
const jwt= require('jsonwebtoken');

function verifyUser(req,res,next){
  let token=req.headers.token;
  try {
    if(!token) throw 'Unauthorised access';
    else{
        let payload=jwt.verify(token,'User');
        if(!payload) throw 'Unauthorized access';
        next();                                 
    }
  } catch (error) {
    console.log(error);
  }
  
}

function getUser(re) {
  const decoded = jwt.verify(re.headers.token,'User');
  if(!decoded) throw 'Unauthorized access';
  return decoded
}
/***************************route******************/

userRouter.get('/home/',verifyUser, async (req, res) => {
    //  console.log('userji');  
  try {
     const Data = await eventModel.find({approved:true});
    //  console.log(Data)
     res.send(Data)
  } catch (error) {
    res.status(404).send('data not found');
  }
});

userRouter.get('/bookings',verifyUser, async (req, res) => {
   const user = getUser(req); 
try {
  const Data = await bookingModel.find({ userId: user.User });
  const eventIds = Data.map((booking) => booking.event_id);
  const eventData = await eventModel.find({ _id: { $in: eventIds }, approved: true });
  console.log('data',Data);
  console.log('eventdarta',eventData);
  
  res.send({ bookings: Data, events: eventData });
} catch (error) {
  res.status(404).send('data not found');
}
});

module.exports = userRouter;