import { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import { screens } from '../';

import { Layout } from '../../components';
import { routes } from '../../data';
import { useTypedSelector } from '../../hooks/redux';

const PrivateRoutes: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path={routes.home} element={<screens.Home />} />
        <Route path={routes.about} element={<screens.About />} />
        <Route path={routes.notFound} element={<screens.NotFound />} />
        <Route path={routes.profile} element={<screens.Profile />} />
        <Route path={routes.exchangeRate} element={<screens.ExchangeRate />} />
        <Route path={routes.quiz} element={<screens.Quiz />} />
        <Route path={routes.projects} element={<screens.Projects />} />
        <Route path={routes.quizSmall} element={<screens.SmallQuiz />} />
        {currentUser?.role === 'admin' && <Route path={routes.admin} element={<screens.Admin />} />}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
