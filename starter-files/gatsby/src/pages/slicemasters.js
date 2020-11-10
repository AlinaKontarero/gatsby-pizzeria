import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SliceMasterGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <SliceMasterGrid>
        {slicemasters.map((person) => (
          <SliceMasterStyles>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name} </span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} alt={person.name} />
            <p className="description">{person.description}</p>
          </SliceMasterStyles>
        ))}
      </SliceMasterGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        id
        name
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
        slug {
          current
        }
        description
      }
    }
  }
`;
