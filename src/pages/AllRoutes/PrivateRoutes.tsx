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
      <Route path="/" element={<Layout />}>
        <Route path={routes.home} element={<screens.Home />} />
        <Route path={routes.about} element={<screens.About />} />
        <Route path={routes.notFound} element={<screens.NotFound />} />
        <Route path={routes.profile} element={<screens.Profile />} />
        <Route path={routes.settings} element={<screens.Settings />} />
        <Route path={routes.contacts} element={<screens.Contacts />} />
        <Route path={routes.exchangeRate} element={<screens.ExchangeRate />} />
        <Route path={routes.quiz} element={<screens.Quiz />} />
        <Route path={routes.projects} element={<screens.Projects />} />
        <Route path={routes.quizSmall} element={<screens.SmallQuiz />} />
        <Route path={routes.quizBig} element={<screens.BigQuiz />} />
        <Route path={routes.catalog} element={<screens.Catalog />} />
        <Route path={routes.quizBigStep} element={<screens.BigQuizStep />} />
        <Route path={routes.quizFinish} element={<screens.QuizFinish />} />
        {currentUser?.role === 'admin' && <Route path={routes.admin} element={<screens.Admin />} />}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
