import React, { useContext, Fragment } from 'react';
import { GlobalContext } from '../../pages/_app';
import { Row, Col } from 'react-grid-system';
import Card from '../card/card';
import Link from 'next/link';
import Pagination from '../pagination/pagination';

const PosterResult = () => {
  const { setGlobalState, ...globalState } = useContext(GlobalContext);
  const { searchKey, searchResults = [], loading } = globalState || {};

  // Loading screen
  if (loading) {
    return (
      <Row>
        <Col className="text-center">
          <div>
            <img src="spinner.gif" width="48" />
            <div className="title">loading...</div>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      {/* If some error occurs, showing generic message */}
      {!searchResults.length ? (
        <Col className="text-center">
          <Card padded>
            <h3 className="title">Not Found</h3>
            <div className="title">Please try searching some other poster</div>
          </Card>
        </Col>
      ) : (
        <Fragment>
          {searchResults.map(({ Title, Year, Poster, imdbID }, index) => {
            // Replace searched word in title
            const highlightedWord = () =>
              Title.toLowerCase().replaceAll(
                searchKey.toLowerCase(),
                `<mark>${Title.slice(
                  Title.toLowerCase().search(searchKey.toLowerCase()),
                  Title.toLowerCase().search(searchKey.toLowerCase()) +
                    searchKey.length
                )}</mark>`
              );

            return (
              <Col
                sm={6}
                md={4}
                lg={3}
                key={imdbID + index}
                className="space-below text-center"
              >
                <Link href={`/posterDetails/${imdbID}`}>
                  <a>
                    <Card padded>
                      <img className="space-below" src={Poster} />
                      <h2
                        className="space-below extra-short title"
                        dangerouslySetInnerHTML={{
                          __html: highlightedWord(),
                        }}
                      />
                      <div className="year">{Year}</div>
                    </Card>
                  </a>
                </Link>
              </Col>
            );
          })}
          <Col xs={12}>
            <Pagination />
          </Col>
        </Fragment>
      )}
    </Row>
  );
};

export default PosterResult;
