import './App.scss';
import { Loader } from './components';
import { useAuth } from './hooks/useAuth';
import { screens } from './pages';

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authRes = useAuth();

  return (
    <>
      <screens.AllRoutes />
      <Loader />
    </>
  );
};
export default App;
