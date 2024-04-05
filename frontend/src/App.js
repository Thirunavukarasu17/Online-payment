import React from 'react';
import PaymentForm from './components/PaymentForm';
import OrderStatus from './components/OrderStatus';
import Bill from './components/Bill';

const App = () => {
  const orderId = 'order-id'; 

  return (
    <div>
      <h1>Payment Integration Demo</h1>
      <div>
        <h2>Initiate Payment</h2>
        <PaymentForm orderId={orderId} />
      </div>
      <div>
        <h2>Check Order Status</h2>
        <OrderStatus orderId={orderId} />
      </div>
      <div>
        <h2>View Bill</h2>
        <Bill orderId={orderId} />
      </div>
    </div>
  );
};

export default App;
