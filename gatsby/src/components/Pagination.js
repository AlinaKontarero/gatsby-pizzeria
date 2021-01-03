import React from 'react';
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
  @media (max-width: 800px) {
    .word-label {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <PaginationStyles key={currentPage}>
      <a disabled={!hasPrevPage} href={`/${base}/${prevPage}`}>
        &#x2190; <span className="word-label"> Prev </span>
      </a>
      {Array.from({ length: totalPages }).map((_, i) => (
        <a
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          href={`/${base}/${i > 0 ? i + 1 : ''}`}
          key={i}
        >
          {i + 1}
        </a>
      ))}
      <a disabled={!hasNextPage} href={`/${base}/${nextPage}`}>
       <span className="word-label"> Next </span> &#x2192;
      </a>
    </PaginationStyles>
  );
}

export default Pagination;
