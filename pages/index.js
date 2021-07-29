import factory from '../ethereum/factory';

const CampaignIndex = ({ campaigns }) => {
  return <div>{campaigns[0]}</div>;
};

export const getServerSideProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
};

export default CampaignIndex;
