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
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const campaign = createCampaignInstance(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });
      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={handleOnSubmit} error={!!errorMessage}>
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

        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading} disabled={loading}>
          Create!
        </Button>
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
