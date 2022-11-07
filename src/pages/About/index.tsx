import { FC } from 'react';

import s from './About.module.scss';

const About: FC = () => {
  // const {app, auth, exchangeRate, projects, works} = useTypedSelector(state => state);

  return (
    <div className={'container ' + s.about}>
      <br />
      <p>about</p>
      <br />
    </div>
  );
};
export default About;
