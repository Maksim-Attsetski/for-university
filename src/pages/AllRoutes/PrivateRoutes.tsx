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
        <Route path={routes.about} element={<screens.About />} />
        <Route path={routes.notFound} element={<screens.NotFound />} />
        <Route path={routes.profile} element={<screens.Profile />} />
        <Route path={routes.exchangeRate} element={<screens.ExchangeRate />} />
        <Route path={routes.quiz} element={<screens.Quiz />} />
        <Route path={routes.projects} element={<screens.Projects />} />
        <Route path={routes.quizSmall} element={<screens.SmallQuiz />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
