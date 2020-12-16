import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function usePizza({ pizzas, values }) {
  // 1. Create state to hold the order
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
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

  const submitOrder = async (e) => {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessage('Go eat');

    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    console.log(body);

    // 4. send this data with a serverless fn when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_CASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if everything is working
    if(res.status >= 400 && res.status < 600) {
      setLoading(false);
      setError(text.message)
    } else {
      // working!
      setLoading(false);
      setMessage('Success! Come on down for your pizza!')
    }

  };

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
