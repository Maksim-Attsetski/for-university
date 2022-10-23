import { useMemo, FC } from 'react';
import { Outlet } from 'react-router-dom';
import { routeNames } from '../types';
import NavBar from './NavBar';

const Layout: FC = () => {
  const links: {
    to: routeNames;
    name: string;
  }[] = useMemo(
    () => [
      { to: '/', name: 'Главная' },
      { to: '/about', name: 'О проекте' },
    ],
    []
  );
  return (
    <div>
      <NavBar links={links} title='custom menu' />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
