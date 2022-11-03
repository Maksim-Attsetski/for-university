import { FC, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/redux';

import s from './About.module.scss';

const About: FC = () => {
  const {app, auth, exchangeRate, projects, works} = useTypedSelector(state => state);

  useEffect(() => {
console.log(app, auth, exchangeRate, projects, works);
  }, [app, auth, exchangeRate, projects, works])

  return (
    <div className={'container ' + s.about}>
      <br />
      <p>about</p>
      <br />
    </div>
  );
};
export default About;
