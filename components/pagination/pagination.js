import React, { useContext } from 'react';
import { GlobalContext } from '../../pages/_app';
import { getPosterData } from '../searchPoster/searchPosterUtils';

const Pagination = ({ onChange }) => {
  const globalContext = useContext(GlobalContext);
  const { setGlobalState, ...globalState } = globalContext;
  const { totalResults = 1, page: currentPage = 1, searchKey = '' } =
    globalState || {};

  // omdbapi default to 10 items in a page, no way to change it, so it's hardcoded
  const lastPage = Math.ceil(totalResults / 10);

  const firstPage = 1;
  const pageArr = [
    '<',
    firstPage,
    currentPage > 3 ? currentPage - 2 : firstPage + 1,
    currentPage > 3 ? currentPage - 1 : firstPage + 2,
    currentPage > 3 ? currentPage : firstPage + 3,
    currentPage > 3 ? currentPage + 1 : firstPage + 4,
    '...',
    lastPage,
    '>',
  ];

  if (currentPage > 4) pageArr.splice(2, 0, '...');

  const handlePageClick = (page) => {
    if (page === '...') {
      return;
    } else if (page === '<' && currentPage > 1) {
      getPosterData(globalContext, searchKey, currentPage - 1);
    } else if (page === '>' && currentPage < lastPage) {
      getPosterData(globalContext, searchKey, currentPage + 1);
    } else {
      getPosterData(globalContext, searchKey, page);
    }

    // If we need to do something else on change in future
    if (onChange) onChange(page);
  };

  return (
    <div className="pagination">
      {pageArr.map((item, index) => {
        if (!item) return null;
        return (
          <button
            key={item + index}
            className={item === currentPage ? 'current' : ''}
            onClick={() => {
              handlePageClick(item);
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
