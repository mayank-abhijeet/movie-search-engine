import React from 'react';
import PosterDetails from '../../components/posterDetails/posterDetails';
import Card from '../../components/card/card';
import { Row, Col } from 'react-grid-system';
import { getPosters } from '../../components/searchPoster/searchServices';

const PosterDetailsPage = ({ data, error }) => {
  if (error) {
    return (
      <Row className="space-below space-top extra-long">
        <Col className="text-center">
          <Card>
            <div className="title space-below space-top extra-long">
              {error}
            </div>
          </Card>
        </Col>
      </Row>
    );
  }

  return <PosterDetails data={data} />;
};

// SSR
export async function getServerSideProps({ query }) {
  const { posterId } = query;

  try {
    const data = await getPosters(posterId, true);
    return { props: { data, error: data.Error || '' } };
  } catch (error) {
    return { props: { error: 'Something went wrong!' } };
  }
}

export default PosterDetailsPage;
