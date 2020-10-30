import React from 'react';
import { Link } from 'gatsby';

function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map(_topping => _topping.name).join(', ')} </p>
      </Link>
    </div>
  );
}

function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((_pizza) => (
        <SinglePizza key={_pizza.id} pizza={_pizza} />
      ))}
    </div>
  );
}

export default PizzaList;
