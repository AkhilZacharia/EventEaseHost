const express = require('express');
const routerO = express.Router(); 
routerO.use(express.json());
routerO.use(express.urlencoded({extended:true}));
const eventModel = require('../model/eventData');
const bookingModel = require('../model/bookingData');
const counterModel = require('../model/ticketCounter');

const jwt= require('jsonwebtoken');


function verifyOrganizer(req,res,next){
  let token=req.headers.token;
  try {
    if(!token) throw 'Unauthorised access';
    else{
        let payload=jwt.verify(token,'Organizer');
        if(!payload) throw 'Unauthorized access';
        next();                                 
    }
  } catch (error) {
    console.log(error);
  }
  
}

function getUser(re) {
  const decoded = jwt.verify(re.headers.token,'Organizer');
  if(!decoded) throw 'Unauthorized access';
  return decoded
}

/***************************route******************/

routerO.get('/',verifyOrganizer, async (req, res) => {
  try {
    const eventData = await eventModel.find();
    res.send(eventData)
  } catch (error) {
    res.status(404).send('data not found');
  }
});

routerO.post('/addevent',verifyOrganizer,async (req,res)=>{ 
                   console.log(req.body);
              try{
                const user =getUser(req);
                const item = req.body;
                const eventdata = new eventModel({...item,userId:user.User});
                await eventdata.save();
                const data = {
                  TotalTickets:eventdata.totalTickets,
                  available:eventdata.totalTickets,
                  eventId: eventdata._id.toString(),
                  userId:user.User
                }
                const counterdata = new counterModel(data);
                await counterdata.save();
                res.status(200).send({message:'Added'});
              } catch (error) {
                console.log(error);
                res.status(404).send({message:'add UNSuccessful'});
              }
    
});

routerO.get('/myevents',verifyOrganizer, async (req, res) => {
  try {
    const user =getUser(req);
    const eventData = await eventModel.find({userId:user.User,approved: true});
    // console.log(eventData);
    res.send(eventData)
  } catch (error) {
    res.status(404).send('data not found');
  }
});

routerO.get('/booking',verifyOrganizer,async (req,res)=>{ 
  try{
  const booking = await bookingModel.find();
  // console.log(booking)
  res.status(200).send(booking);
  } catch (error){
    res.send({message:'event not found'});
  }
});

/******edit*******/
// routerO.get('/find/:id',verifyOrganizer,async (req,res)=>{ 
//   try{
//   const event = await eventModel.findById(req.params.id);
//   console.log(event)
//   res.status(200).send({message:'Found',event});
//   } catch (error){
//     res.send({message:'event not found'});
//   }
// });

// routerO.put('/edit/:id',verifyOrganizer, async (req,res)=>{
//     try{
//       const eventdata = await eventModel.findByIdAndUpdate(req.params.id, req.body);
//       res.send({message:'updated'});
//     } catch (error) {
//       res.send('event not found');
//     }
// });


// /**** delete event ***/
// routerO.delete('/delete/:id',verifyOrganizer, async (req, res) => {
//   try {
//     const eventdata = await eventModel.findByIdAndDelete(req.params.id);
//     res.send({message:'Deleted'})
//   } catch (error) {
//     res.status(404).send({message:'Delete UNSuccessful'});
//   }
// });

module.exports = routerO;