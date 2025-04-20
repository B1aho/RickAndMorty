import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from './providers';
import { useCallback } from 'react';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const pageClickHandler = useCallback(
    (index) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(index);
      setApiURL(pages[index]);
    },
    [pages, setActivePage, setApiURL]
  );

  const onFirstPageClick = useCallback(() => {
    pageClickHandler(0);
  }, [pageClickHandler]);

  const onPrevPageClick = useCallback(() => {
    pageClickHandler(activePage - 1);
  }, [pageClickHandler, activePage]);

  const onNextPageClick = useCallback(() => {
    pageClickHandler(activePage + 1);
  }, [pageClickHandler, activePage]);

  const onLastPageClick = useCallback(() => {
    pageClickHandler(pages.length - 1);
  }, [pageClickHandler, pages]);

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {pages[activePage - 1] && (
        <>
          {/* First page */}
          {activePage - 1 !== 0 && (
            <>
              <Page onClick={onFirstPageClick}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          {/* Prev page */}
          <Page onClick={onPrevPageClick}> {activePage} </Page>
        </>
      )}

      {/* Current page */}
      <Page active>{activePage + 1}</Page>

      {pages[activePage + 1] && (
        <>
          {/* Next page */}
          <Page onClick={onNextPageClick}> {activePage + 2} </Page>

          {/* Last page */}
          {activePage + 1 !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={onLastPageClick}>Last »</Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
