import { useMemo } from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Popup from './components/Popup/Popup';

const App = () => {
  const links: string[] = useMemo(() => ['Home', 'About us', 'Logout'], []);

  return (
    <div className='container'>
      <div className='content'>
        <h2>hello</h2>
        <img src='https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_960_720.jpg' alt='google' />
      </div>
      <NavBar links={links} title='custom menu' />
      <br />
      <hr />
      <br />
      <Popup links={links} />
      <br />
    </div>
  );
};
export default App;
