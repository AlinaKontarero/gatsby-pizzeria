import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active {
      background: var(--yellow);
    }
    &:hover {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  const counts = pizzas
    .map((_pizza) => _pizza.toppings)
    .flat()
    // eslint-disable-next-line array-callback-return
    .reduce((acc, topping) => {
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});

  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
            vegetarian
          }
        }
      }
    }
  `);
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      <p>{activeTopping}</p>
      {toppingsWithCounts.map((_topping) => (
        <Link
          key={_topping.id}
          to={`topping/${_topping.name}`}
          className={_topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{_topping.name} </span>
          <span className="count">{_topping.count} </span>
        </Link>
      ))}
    </ToppingStyles>
  );
}
