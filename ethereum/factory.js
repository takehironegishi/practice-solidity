import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import { CONTRACT_ADDRESS_OF_CAMPAIGN_FACTORY } from '../config';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  CONTRACT_ADDRESS_OF_CAMPAIGN_FACTORY
);

export default instance;
