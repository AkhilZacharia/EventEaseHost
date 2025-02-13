const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');
const paymentRouter = express.Router(); 
const jwt= require('jsonwebtoken');
paymentRouter.use(bodyParser.json());

function userAccess(req,res,next){
  let token=req.headers.token;
  try {
    if(!token) throw 'Unauthorised access';
    else{
        let payload=jwt.verify(token,'User') || jwt.verify(token,'Organizer') ;
        if(!payload) throw 'Unauthorized access';
        next();                                 
    }
  } catch (error) {
    console.log(error);
  }
  
}

paymentRouter.post('/create-payment-intent',userAccess, async (req, res) => {
    console.log('hi'); 
  try {
    const { amount } = req.body; 
    if (!amount) {
      return res.status(400).send({ error: 'Amount is required' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'inr', 
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
});


module.exports = paymentRouter;