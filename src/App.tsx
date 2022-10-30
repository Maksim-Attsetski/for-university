import './App.scss';

import { useAuth } from './hooks/useAuth';

import { screens } from './pages';
import { Loader, ToTop } from './components';

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authRes = useAuth();

  return (
    <>
      <screens.AllRoutes />
      <ToTop />
      <Loader />
    </>
  );
};
export default App;
