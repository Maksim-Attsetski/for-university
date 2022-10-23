import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
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
      <Route path={routeNames.home} element={<Home />} />
      <Route path={routeNames.about} element={<About />} />
      <Route path={routeNames.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
