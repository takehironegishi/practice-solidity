import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import { createCampaignInstance } from '../ethereum/campaign';

export const RequestRow = ({ request, address, id, approversCount }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount, complete } = request;

  const isReadyToFinalize = approvalCount > approversCount / 2;

  const handleOnApprove = async () => {
    const campaign = createCampaignInstance(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({ from: accounts[0] });
  };

  const handleOnFinalize = async () => {
    const campaign = createCampaignInstance(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
  };

  return (
    <Row disabled={complete} positive={isReadyToFinalize && !complete}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>{`${approvalCount}/${approversCount}`}</Cell>
      <Cell>
        {complete ? null : (
          <Button color="green" basic onClick={handleOnApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button color="teal" basic onClick={handleOnFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};
