import 'semantic-ui-css/semantic.min.css';
import { Card, Button } from 'semantic-ui-react';
import { Layout } from '../components/Layout';
import factory from '../ethereum/factory';

const CampaignIndex = ({ campaigns }) => {
  const items = campaigns.map((address) => ({
    header: address,
    description: <a>View Campaign</a>,
    fluid: true,
  }));

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button
          floated="right"
          content="Create Campaign"
          icon="add circle"
          primary
        />
        <Card.Group items={items} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
};

export default CampaignIndex;
