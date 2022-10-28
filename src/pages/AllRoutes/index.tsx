import { FC } from 'react';
import { useTypedSelector } from '../../hooks/redux';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AllRoutes: FC = () => {
  const { isAuth } = useTypedSelector(state => state.auth);

  return isAuth ? <PublicRoutes /> : <PrivateRoutes />;
};

export default AllRoutes;
