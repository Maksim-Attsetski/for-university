import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../data';
import { auth } from '../../firebase';
import { useTypedSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/useActions';

const Profile: FC = () => {
  const { currentUser } = useTypedSelector(state => state.auth);
  const { action } = useActions();
  const navigate = useNavigate();

  const onDeleteAccount = async () => {
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

  return (
    <div>
      <div className='container'>
        <div>Профиль</div>
        {currentUser?.displayName && <div>Имя: {currentUser?.displayName}</div>}
        {currentUser?.email && <div>Email: {currentUser?.email}</div>}
        <button onClick={onDeleteAccount}>Удалить аккаунт</button>
      </div>
    </div>
  );
};

export default Profile;
