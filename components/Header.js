import Link from 'next/link';
import { Menu } from 'semantic-ui-react';

export const Header = () => (
  <Menu style={{ marginTop: '24px' }}>
    <Link href="/">
      <a className="item">CrowdCoin</a>
    </Link>

    <Menu.Menu position="right">
      <Link href="/">
        <a className="item">Campaigns</a>
      </Link>
      <Link href="/campaigns/new">
        <a className="item">+</a>
      </Link>
    </Menu.Menu>
  </Menu>
);
