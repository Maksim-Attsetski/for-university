import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import { About, Home, NotFound } from '../pages';

const AllRoutes = () => {
  const routeNames = useMemo(
    () => ({
      home: '/',
      notFound: '/*',
      about: '/about',
    }),
    []
  );

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={routeNames.home} element={<Home />} />
        <Route path={routeNames.about} element={<About />} />
        <Route path={routeNames.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
