import React, { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { Container, Row, Col } from 'react-grid-system';
import '../styles/globals.scss';

// GlobalContext, which can be fetch using context API in any child component
export const GlobalContext = React.createContext();

function MyApp({ Component, pageProps }) {
  const [globalState, setGlobalState] = useState({ loading: false });
  const [loading, setLoading] = useState(false);

  Router.onRouteChangeStart = () => {
    setLoading(true);
  };

  Router.onRouteChangeComplete = () => {
    setLoading(false);
  };

  const Loading = () => (
    <Row className="space-below space-top extra-long">
      <Col className="text-center space-top extra-long">
        <div>
          <img src="spinner.gif" width="48" />
          <div className="title">loading...</div>
        </div>
      </Col>
    </Row>
  );

  return (
    <GlobalContext.Provider value={{ ...globalState, setGlobalState }}>
      <Head>
        <title>Movie Search Engine</title>
      </Head>
      <Container>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </Container>
    </GlobalContext.Provider>
  );
}

export default MyApp;
