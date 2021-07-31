import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import { createCampaignInstance } from '../ethereum/campaign';

export const ContributeForm = ({ address }) => {
  const [value, setValue] = useState('');
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
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
    setValue('');
  };

  return (
    <Form onSubmit={handleOnSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>

      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading} disabled={loading}>
        Contribute!
      </Button>
    </Form>
  );
};
