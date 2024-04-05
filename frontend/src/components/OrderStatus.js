import React, { useState, useEffect } from 'react';
import apiService from '../Services/apiService';

const OrderStatus = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await apiService.getOrderStatus(orderId);
        setOrderStatus(response.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order status:', error);
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          Order Status: {orderStatus || 'Unknown'}
        </p>
      )}
    </div>
  );
};

export default OrderStatus;
