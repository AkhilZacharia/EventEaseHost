const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const express = require('express');
const mailer = express.Router(); 
const jwt= require('jsonwebtoken');
const bookingModel = require('../model/bookingData');
const counterModel = require('../model/ticketCounter');
const eventModel = require('../model/eventData');

function getNumber() {
  return Math.floor(Math.random() * (60 + 1)) + 1;
}
function getAlphabet() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

function getUser(re) {
  const decoded = jwt.verify(re.headers.token,'User');
  if(!decoded) throw 'Unauthorized access';
  return decoded
}

const book = async (usr,det)=>{
  const data = {
    userName:usr.UserName,
    userId:usr.User
  }
  const counter = await counterModel.findOne({ eventId: det.event_id });
if (counter) {
  const newAvailable = Math.max(counter.available - det.tickets, 0); 
  await counterModel.findOneAndUpdate({ eventId: det.event_id },{ $set:{ available: newAvailable }});
} else {
  console.log('Event not found');
}
  const booking = await new bookingModel({...data,...det});
  booking.save();

  // console.log(booking);
}

function userAccess(req,res,next){
    let token=req.headers.token;
    try {
      if(!token) throw 'Unauthorised access';
      else{
          let payload=jwt.verify(token,'User') ;
          if(!payload) throw 'Unauthorized access';
          next();                                 
      }
    } catch (error) {
      console.log(error);
    }
    
  }

let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.Mail, 
      pass: process.env.Code  
    }
  });

mailer.post('/',userAccess, async (req,res)=>{
    const user = getUser(req);
    const details= req.body;
    console.log(details);
    const event = await eventModel.findOne({ _id: details.event_id });
    console.log(event);
    
    book(user,details);
    ejs.renderFile(path.join(__dirname, 'Template.ejs'), {
      name: user.UserName,
      amount:details.amount,
      ticketCount:details.tickets,
      eventName:details.event,
      location:event.location,
      time:event.time,
      date:event.date.toDateString(),
      row:getAlphabet(),
      seat:getNumber()
    }, (err, html) => {
      if (err) {
        console.error('Error rendering template:', err);
        return;
      }
      let mailOptions = {
        from: process.env.Mail, 
        to: user.Email, 
        subject: 'Ticket Booking Confirmation', 
        html: html, 
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    
    });
    res.send('success');
  })

module.exports = mailer;