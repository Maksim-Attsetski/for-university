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
        <Route path={routes.about} element={<screens.About />} />
        <Route path={routes.contacts} element={<screens.Contacts />} />
        <Route path={routes.catalog} element={<screens.Catalog />} />
        <Route path={routes.catalog + '/:id'} element={<screens.CatalogItem />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
