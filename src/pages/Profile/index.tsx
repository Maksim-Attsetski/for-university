import { FC, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { updatePassword, updateProfile } from 'firebase/auth';
import { auth, fs } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';
import useProjects from '../../hooks/useProjects';

import { Button, Input, Popup, Title, Toast } from '../../components';
import { getErrorMsg } from '../../utils';
import { routes } from '../../data';
import { IUser } from '../../types';

interface IEditItems {
  name: string;
  pass: string;
}

const Profile: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { projects } = useTypedSelector(state => state.projects);

  const [editItems, setEditItems] = useState<IEditItems>({ name: '', pass: '' });
  const [error, setError] = useState<null | string>(null);

  const { action } = useActions();
  const navigate = useNavigate();
  const { onGetProjects } = useProjects();

  const onDeleteAccount = async (): Promise<void> => {
    try {
      action.setIsLoading(true);
      await auth?.currentUser?.delete();

      projects.forEach(async item => {
        await deleteDoc(doc(fs, 'projects', item.id));
      });

      action.setUser(null);
      action.setAuth(false);
      navigate(routes.home);
    } catch (error) {
      setError(getErrorMsg(error));
    } finally {
      action.setIsLoading(false);
    }
  };

  const onSaveEdition = async (): Promise<void> => {
    if (!auth.currentUser) return;
    try {
      action.setIsLoading(true);
      const { name, pass } = editItems;

      if (name) {
        const data = { displayName: name || 'xxx' };

        action.updateUserData(data as IUser);
        await updateProfile(auth.currentUser, data);
      }

      if (pass) {
        await updatePassword(auth.currentUser, pass);
      }

      if (!pass && !name) {
        setError(getErrorMsg('empty value'));
      }
    } catch (error) {
      action.updateUserData({ displayName: auth.currentUser.displayName } as IUser); // on error return name
      setError(getErrorMsg(error));
    } finally {
      setEditItems({ name: '', pass: '' });
      action.setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='container'>
        <br />
        <Title text='Профиль' />
        <Button to={routes.projects} text={'Мои проекты'} className='my-3' />
        <br />
        <div>Имя: {currentUser?.displayName || 'Нет имени'}</div>
        {currentUser?.email && <div>Email: {currentUser?.email}</div>}
        <br />
        <div className='flex gap-4 mb-2'>
          <Popup
            buttonText='Редактировать'
            renderBody={setIsShow => (
              <>
                <Title text='Изменяйте что угодно' />
                <br />
                <div className='flex gap-2 mb-3'>
                  <div>
                    <div className='mb-2'>Обновить имя</div>
                    <Input
                      text={editItems.name}
                      placeholder={'Имя'}
                      setText={name => setEditItems({ ...editItems, name })}
                    />
                  </div>
                  <br />
                  <div>
                    <div className='mb-2'>Обновить пароль</div>
                    <Input
                      text={editItems.pass}
                      placeholder={'Пароль'}
                      setText={pass => setEditItems({ ...editItems, pass })}
                    />
                  </div>
                </div>

                <Button
                  text='Сохранить'
                  className='mr-3'
                  onClick={async () => {
                    await onSaveEdition();
                    setIsShow(false);
                  }}
                />
                <Button
                  isSecondary
                  text='Отмена'
                  onClick={() => {
                    setEditItems({ name: '', pass: '' });
                    setIsShow(false);
                  }}
                />
              </>
            )}
          />

          <Popup
            buttonText='Удалить аккаунт'
            renderBody={setIsShow => (
              <>
                <Title text='Вы уверены что хотите удалить свой аккаунт?' />
                <br />
                <Button
                  text='Да'
                  className='mr-3'
                  onClick={async () => {
                    await onDeleteAccount();
                    setIsShow(false);
                  }}
                />
                <Button isSecondary text='Нет' className='mr-3' onClick={() => setIsShow(false)} />
              </>
            )}
          />
        </div>

        {/* // toast */}
        <Toast data={error} setData={setError} isError />
      </div>
    </div>
  );
};

export default Profile;
