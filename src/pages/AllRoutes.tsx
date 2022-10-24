import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components';
import { routes } from '../data';
import { About, Home, NotFound } from '../pages';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
