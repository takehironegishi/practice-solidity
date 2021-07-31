import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { createCampaignInstance } from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import { Layout } from '../../../../components/Layout';

const RequestNew = ({ address }) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');

  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>

        <Button primary>Create!</Button>
      </Form>
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

export default RequestNew;
