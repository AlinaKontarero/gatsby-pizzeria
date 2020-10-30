import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  const pizzas = data.allSanityPizza.nodes;

  return (
    <>
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
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
