import factory from '../ethereum/factory';
import {
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const useStyle = makeStyles({
  button: {
    padding: '8px 16px',
    textTransform: 'none',
  },
});

const CampaignIndex = ({ campaigns }) => {
  const classes = useStyle();

  return (
    <div>
      <h3>Open Campaigns</h3>
      {campaigns.map((address) => (
        <Card>
          <CardContent>
            <Typography variant="h6">{address}</Typography>
            <Link component="button" variant="body1">
              View Campaign
            </Link>
          </CardContent>
        </Card>
      ))}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircle />}
        className={classes.button}
        size="large"
      >
        Create Campaign
      </Button>
    </div>
  );
};

export const getServerSideProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { props: { campaigns } };
};

export default CampaignIndex;
