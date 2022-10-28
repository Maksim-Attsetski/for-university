import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import { screens } from '../';

import { Layout } from '../../components';
import { routes } from '../../data';

const PrivateRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={routes.home} element={<screens.Home />} />
        <Route path={routes.auth} element={<screens.Auth />} />
        <Route path={routes.about} element={<screens.About />} />
        <Route path={routes.notFound} element={<screens.NotFound />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
