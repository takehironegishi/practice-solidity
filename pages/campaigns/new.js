import { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Layout } from '../../components/Layout';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={handleOnSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} disabled={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
