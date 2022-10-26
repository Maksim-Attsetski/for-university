import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import { About, Home, NotFound, ExchangeRate } from '../pages';

import { Layout } from '../components';
import { routes } from '../data';

const AllRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.notFound} element={<NotFound />} />
        <Route path={routes.exchangeRate} element={<ExchangeRate />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
