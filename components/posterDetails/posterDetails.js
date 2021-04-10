import React from 'react';
import Head from 'next/head';
import { Row, Col } from 'react-grid-system';

const PosterDetails = ({ data }) => {
  const { Poster, Title, Year, imdbRating, Genre, Plot } = data || {};
  return (
    <Row className=" space-top extra-long title">
      <Head>
        <title>{Title}</title>
      </Head>
      <Col md={4} className="space-below text-center-mobile">
        <img src={Poster} />
      </Col>
      <Col md={8} className="space-below">
        <h2 className="space-below short">{Title}</h2>
        <div className="space-below short">IMDb Ratinf: {imdbRating}</div>
        <div className="space-below short">{Year}</div>
        <div className="space-below short">{Genre}</div>
        <div>{Plot}</div>
      </Col>
    </Row>
  );
};

export default PosterDetails;
