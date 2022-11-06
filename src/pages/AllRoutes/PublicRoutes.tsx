import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import { screens } from '../';

import { Layout } from '../../components';
import { routes } from '../../data';

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={routes.auth} element={<screens.Auth />} />
        <Route path={routes.notFound} element={<screens.NotFound />} />
        <Route path={routes.home} element={<screens.Home />} />
        <Route path={routes.futureHome} element={<screens.FutureHome />} />
        <Route path={routes.about} element={<screens.About />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
