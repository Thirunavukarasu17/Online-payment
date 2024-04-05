import React, { useState } from 'react';
import apiService from '../Services/apiService';

const PaymentForm = ({ orderId }) => {
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async () => {
    try {
      const response = await apiService.initiatePayment(orderId);
      setPaymentUrl(response.paymentUrl);
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div>
      {paymentUrl ? (
        <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
          Proceed to Payment
        </a>
      ) : (
        <button onClick={handlePayment}>Initiate Payment</button>
      )}
    </div>
  );
};

export default PaymentForm;
