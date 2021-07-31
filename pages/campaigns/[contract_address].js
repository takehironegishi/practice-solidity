import { Card } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import { Layout } from '../../components/Layout';
import { createCampaignInstance } from '../../ethereum/campaign';

const CampaignShow = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description:
        'You must contribute at least this much wei to become an approver',
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers',
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign',
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'The balance is how much money this campaign has left to spend',
    },
  ];

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Card.Group items={items} />
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const campaign = createCampaignInstance(ctx.query.contract_address);

  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
};

export default CampaignShow;
