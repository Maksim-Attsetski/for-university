import { FC, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { updatePassword, updateProfile } from 'firebase/auth';
import { auth, fs } from '../../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';
import useProjects from '../../hooks/useProjects';
import useOutsideMenu from '../../hooks/useOutsideMenu';
import { getErrorMsg } from '../../utils';
import { routes } from '../../data';
import { IUser } from '../../types';

import s from './Profile.module.scss';
import { images } from '../../assets';
import { DeleteProfileModal, EditProfileModal } from '../../components/modals';
import { Button, Title, Toast } from '../../components';

interface IEditItems {
  name: string;
  pass: string;
}

const Profile: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { projects } = useTypedSelector(state => state.projects);
  const navigate = useNavigate();
  const { action } = useActions();
  const { onGetProjects } = useProjects();

  const { isShow: editVisible, setIsShow: setEditVisible } = useOutsideMenu();
  const { isShow: deleteVisible, setIsShow: setDeleteVisible } = useOutsideMenu();

  const [error, setError] = useState<null | string>(null);
  const provider = useMemo(() => currentUser?.providerData[0].providerId, [currentUser]);

  const onDeleteAccount = async (): Promise<void> => {
    try {
      action.setIsLoading(true);
      await auth?.currentUser?.delete();

      Object.keys(projects).forEach(async item => {
        await deleteDoc(doc(fs, 'projects', item));
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

  const onSaveEdition = async (editItems: IEditItems): Promise<void> => {
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
      action.setIsLoading(false);
    }
  };

  useEffect(() => {
    onGetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container">
        <br />
        <Title text="Профиль" />
        {currentUser?.role === 'admin' && <Button to={routes.admin} text={'Админка'} className="my-3" />}
        <br />
        <div className={s.info}>
          <img src={currentUser?.photoURL || images.profile} alt="profile" className={s.infoImg} />
          <br />
          <div>Имя: {currentUser?.displayName || 'Нет имени'}</div>
          {currentUser?.email && <div>Email: {currentUser?.email}</div>}
        </div>
        <br />
        <div className="flex gap-4 mb-2">
          <Button text="Редактировать" onClick={() => setEditVisible(true)} />
          <Button text="Удалить аккаунт" onClick={() => setDeleteVisible(true)} />
        </div>

        {/* modals */}
        <DeleteProfileModal isShow={deleteVisible} setIsShow={setDeleteVisible} onDeleteAccount={onDeleteAccount} />
        <EditProfileModal
          isShow={editVisible}
          onSaveEdition={onSaveEdition}
          provider={provider}
          setIsShow={setEditVisible}
        />
        {/* // toast */}
        <Toast data={error} setData={setError} isError />
      </div>
    </div>
  );
};

export default Profile;
