import Link from 'next/link';
import { Card, Button } from 'semantic-ui-react';
import { Layout } from '../components/Layout';
import factory from '../ethereum/factory';

const CampaignIndex = ({ campaigns }) => {
  const items = campaigns.map((address) => ({
    header: address,
    description: (
      <Link href="/campaigns/[contract_address]" as={`/campaigns/${address}`}>
        <a>View Campaign</a>
      </Link>
    ),
    style: { overflowWrap: 'break-word' },
    fluid: true,
  }));

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
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
