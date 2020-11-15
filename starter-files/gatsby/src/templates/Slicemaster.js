import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';


export default function SlicemasterPage({ data: { person } }) {
  return (
    <>
      <SEO
        title={person.name}
        description={person.description}
        image={person.image?.asset?.fluid?.src}
      />
      <div className="center">
        <Img fluid={person.image.asset.fluid} alt={person.name} />
        <div>
          <h2 className="mark"> {person.name} </h2>
          <p>{person.description}</p>
        </div>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      slug {
        current
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
