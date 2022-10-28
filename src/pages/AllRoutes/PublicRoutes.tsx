import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import { screens } from '../';

import { Layout } from '../../components';
import { routes } from '../../data';

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={routes.notFound} element={<screens.NotFound />} />
        <Route path={routes.home} element={<screens.Home />} />
        <Route path={routes.profile} element={<screens.Profile />} />
        <Route path={routes.about} element={<screens.About />} />
        <Route path={routes.exchangeRate} element={<screens.ExchangeRate />} />
        <Route path={routes.quiz} element={<screens.Quiz />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
