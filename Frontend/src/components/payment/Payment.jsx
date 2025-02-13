import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './Payment.css'
import axiosInstance from '../interceptor/axiosInterceptor';

const STRIPE_PUBLIC_KEY = 'pk_test_51QoqaxG2dIymtWxMNQxZoARkSRWY3UKrJlDIPVYe47sADKVAQm4qTXfmugPc9poFO4YNETSiLynQFtIA86zyrWei00MMGYNGxF'; 
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);


const PaymentForm = ({ amount, booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/payment/create-payment-intent', { amount });
      const { clientSecret } = res.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        alert('Payment Successful! Your transaction ID is ' + result.paymentIntent.id);
        
        const bookingDetails = { amount, transactionId: result.paymentIntent.id, ...booking };
        await axiosInstance.post('/mail/', bookingDetails)
          .then((response) => {
            window.location.href = '/mybooking';  
          })
          .catch((error) => {
            console.error('Failed to send booking details:', error);
            alert('There was an issue with the booking.');
          });
      }
    } catch(error) {
   alert('Failed');
   console.log(error);
  }
    setLoading(false);
  };

  return (
    <form className='formPay' onSubmit={handleSubmit}>
      <h3>Pay ₹{amount}</h3>
      <CardElement />
      <button type="submit" disabled={!stripe || !elements || loading}>
        {loading ? 'Processing…' : 'Pay'}
      </button>
      
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const [booking, setBooking] = useState(location.state); 
  const [amount, setAmount] = useState(booking.amount); 

  return (
    <div className='paymentbody'>
    <div className="payment-container">
      <div className="bannerPay">Payment</div>
      <div className="amount">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Elements stripe={stripePromise}>
        <PaymentForm amount={amount} booking={booking}/>
      </Elements>
    </div>
    </div>
  );
};

export default Payment;
