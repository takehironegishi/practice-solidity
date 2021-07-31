import { Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

export const RequestRow = ({ request, address, id, approversCount }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount } = request;

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>{`${approvalCount}/${approversCount}`}</Cell>
    </Row>
  );
};