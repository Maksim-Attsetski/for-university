import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: FC = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '13vh' }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
