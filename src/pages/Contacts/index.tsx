import React, { FC, useState } from 'react';
import { images } from '../../assets';
import { Title } from '../../components';

import s from './Contacts.module.scss';

interface IIcon {
  icon: typeof images.aboutUs;
  url: string;
}
interface IContactLink {
  name: string;
  job: string;
  links: IIcon[];
}

const Contacts: FC = () => {
  const [standartLinks] = useState({
    mail: 'https://mail.google.com/mail/?view=cm&fs=1&to=',
    linkedin: 'https://www.linkedin.com/in/',
    hh: 'https://hh.ru/resume/',
  });
  const [contactLinks] = useState<IContactLink[]>([
    {
      name: 'Attsetski Maxim',
      job: 'Web developer',
      links: [
        { icon: images.linkedin, url: standartLinks.linkedin + 'maxim-attsetski-29405422b' },
        { icon: images.gmail, url: standartLinks.mail + 'maks2001maks2001@gmail.com' },
        { icon: images.github, url: 'https://github.com/Maksim-Attsetski' },
      ],
    },
    {
      name: 'Ivanov Kirill',
      job: 'Project manager',
      links: [
        { icon: images.hh, url: standartLinks.hh + 'e87b2ac8ff0b6edba70039ed1f6d576d647238' },
        { icon: images.gmail, url: standartLinks.mail + 'xeinazoder@gmail.com' },
      ],
    },
    { name: 'Kononova Irina', job: 'UX/UI Desiger', links: [] },
  ]);

  return (
    <div className={s.contacts}>
      <br />
      <div className="container">
        <img src={images.contactsBg} className={s.bg} alt="contacts background" />
        <Title text="Наши контакты" className="mt-2 mb-4" />
        <p className="text-center">
          Здесь вы можете найти контактную информацию,
          <br />
          чтобы связаться с нашими пециалистами в любое время и задать интересующие вас вопросы
        </p>
        <br />
        <div className={s.info}>
          {contactLinks.map(({ job, links, name }) => (
            <div key={name} className={s.info_user}>
              <div>
                {name} — {job}
              </div>
              {!!links.length && (
                <div className={s.links}>
                  {links.map(({ icon, url }) => (
                    <a key={icon} href={url} target={'_blank'}>
                      <img src={icon} alt={name} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
