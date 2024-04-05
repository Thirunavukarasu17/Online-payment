import React from 'react';

const Bill = ({ bill }) => {
  return (
    <div>
      <h2>Bill Details</h2>
      <p>Order ID: {bill.orderId}</p>
      <div>
        <h3>Items:</h3>
        <ul>
          {bill.items.map((item, index) => (
            <li key={index}>
              {item.name}: ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <p>Items Sum: ${bill.itemsSum.toFixed(2)}</p>
      <p>Delivery Fee: ${bill.deliveryFee.toFixed(2)}</p>
      <p>Container Charges: ${bill.containerCharges.toFixed(2)}</p>
      <p>Total Amount: ${bill.totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default Bill;
