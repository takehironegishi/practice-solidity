import Link from 'next/link';
import { Button, Table } from 'semantic-ui-react';
import { createCampaignInstance } from '../../../ethereum/campaign';
import { Layout } from '../../../components/Layout';
import { RequestRow } from '../../../components/RequestRow';

const RequestIndex = ({ address, requestsCount, approversCount, requests }) => {
  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>

        <Body>
          {requests.map((request, index) => (
            <RequestRow
              request={request}
              address={address}
              id={index}
              approversCount={approversCount}
              key={`${index}-${request.recipient}-${request.value}`}
            />
          ))}
        </Body>
      </Table>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const campaignAddress = ctx.query.contract_address;
  const campaign = createCampaignInstance(campaignAddress);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    props: {
      address: campaignAddress,
      requestsCount,
      approversCount,
      requests: JSON.parse(JSON.stringify(requests)),
    },
  };
};

export default RequestIndex;
