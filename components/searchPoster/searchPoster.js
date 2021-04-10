import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../pages/_app';
import { getPosterData } from './searchPosterUtils';
import { Row, Col } from 'react-grid-system';

const SearchPoster = () => {
  const globalContext = useContext(GlobalContext);
  const { setGlobalState, ...globalState } = globalContext;
  const { loading, searchKey: cachedSearchKey, searchResults, page } =
    globalState || {};
  const [searchKey, setSearchKey] = useState(cachedSearchKey);

  // Initial call
  useEffect(() => {
    if (!searchResults) {
      getPosterData(globalContext);
    }
  }, []);

  // call service with typing, uses debouncing for better per
  useEffect(() => {
    if (searchKey !== cachedSearchKey) {
      const timer = setTimeout(() => {
        getPosterData(globalContext, searchKey);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [searchKey]);

  // shows loading sceen when starts typing
  const handlePosterInput = (event) => {
    if (!loading) {
      setGlobalState({ ...globalState, loading: true });
    }
    setSearchKey(event.target.value);
  };

  return (
    <Row>
      <Col className="text-center">
        <input
          type="text"
          placeholder="Enter poster name"
          value={searchKey || ''}
          onChange={handlePosterInput}
          className="search-input"
        />
      </Col>
    </Row>
  );
};

export default SearchPoster;

//pagination
