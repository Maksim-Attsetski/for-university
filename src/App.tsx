import './App.scss';

import { useGetAll } from './hooks/useGetAll';

import { screens } from './pages';
import { Loader, ToTop } from './components';

const App = () => {
  useGetAll();

  return (
    <>
      <screens.AllRoutes />
      <ToTop />
      <Loader />
    </>
  );
};
export default App;
