import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles>
      <a disabled={!hasPrevPage} href={`/${base}/${prevPage}`}>
        &#x2190; Prev
      </a>
      {Array.from({ length: totalPages }).map((_, i) => (
        <a
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          href={`/${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </a>
      ))}
      <a disabled={!hasNextPage} href={`/${base}/${nextPage}`}>
        Next &#x2192;
      </a>
    </PaginationStyles>
  );
}

export default Pagination;
