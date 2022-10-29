import { updatePassword, updateProfile } from 'firebase/auth';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Title } from '../../components';
import { routes } from '../../data';
import { auth } from '../../firebase';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

interface IEditItems {
  name: string;
  pass: string;
}

const Profile: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editItems, setEditItems] = useState<IEditItems>({ name: '', pass: '' });
  const { action } = useActions();
  const navigate = useNavigate();

  const onDeleteAccount = async (): Promise<void> => {
    try {
      action.setIsLoading(true);
      await auth?.currentUser?.delete();

      action.setUser(null);
      action.setAuth(false);
      navigate(routes.home);
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onEditOrSave = async (): Promise<void> => {
    setIsEdit(prev => !prev);
    if (!currentUser) return;

    editItems.name &&
      updateProfile(currentUser, {
        displayName: editItems.name,
      });
    editItems.pass && updatePassword(currentUser, editItems.pass);
  };

  return (
    <div>
      <div className='container'>
        <br />
        <Title text='Профиль' />
        <br />
        {currentUser?.displayName && <div>Имя: {currentUser?.displayName}</div>}
        {currentUser?.email && <div>Email: {currentUser?.email}</div>}
        <br />
        {isEdit && (
          <div className='flex gap-2 justify-center'>
            <div>
              <div className='mb-2'>Обновить имя</div>
              <Input text={editItems.name} placeholder={'Имя'} setText={name => setEditItems({ ...editItems, name })} />
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
            <br />
          </div>
        )}
        <Button to={routes.projects} text={'Мои проекты'} />
        <br />
        <br />

        <Button text='Удалить аккаунт' className='mr-3' onClick={onDeleteAccount} />
        <Button text={isEdit ? 'Сохранить' : 'Редактировать'} onClick={onEditOrSave} />
      </div>
    </div>
  );
};

export default Profile;
