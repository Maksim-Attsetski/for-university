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
  const [contactLinks] = useState<IContactLink[]>([
    {
      name: 'Attsetski Maxim',
      job: 'Web developer',
      links: [{ icon: images.linkedin, url: 'https://www.linkedin.com/in/maxim-attsetski-29405422b' }],
    },
    { name: 'Ivanov Kirill', job: 'Project manager', links: [] },
    { name: 'Irina', job: 'Desiger', links: [] },
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
