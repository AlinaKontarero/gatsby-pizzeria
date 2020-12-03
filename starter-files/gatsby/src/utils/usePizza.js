import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create state to hold the order
  const [order, setOrder] = useContext(OrderContext);
  // 2. Make a fn to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // 3. Make a fn to remove things from order
  const removeFromOrder = (index) => {
    setOrder([
      // before the removing item:
      ...order.slice(0, index),
      ...order.slice(index + 1),
    ]);
  };
  // send this data with a serverless fn when they check out
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
