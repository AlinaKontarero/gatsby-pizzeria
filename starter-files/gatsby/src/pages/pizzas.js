import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data }) {
  const pizzas = data.allSanityPizza.nodes;

  return (
    <>
      <ToppingsFilter />
      <p>Hei! There are {pizzas.length} Pizzas! </p>
      <PizzaList pizzas={pizzas} />
    </>
  );
}
export const query = graphql`
  query PizzaQuery {
    allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 300) {
              ...GatsbySanityImageFluid
            }
            fixed(width: 200, height: 300) {
              ...GatsbySanityImageFixed
            }
          }
        }
      }
    }
  }
`;
