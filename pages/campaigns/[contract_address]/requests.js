import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import { Layout } from '../../../components/Layout';

const RequestIndex = ({ address }) => {
  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  const campaignAddress = ctx.query.contract_address;

  return {
    props: {
      address: campaignAddress,
    },
  };
};

export default RequestIndex;
