import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function SinglePizzaPage({ data }) {
  const { pizza } = data;
  return (
    <>
      <h2> {pizza.name} </h2>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
