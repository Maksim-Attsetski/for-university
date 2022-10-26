import { FC } from 'react';
import { useTypedSelector } from '../../hooks/redux';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AllRoutes: FC = () => {
  const { auth } = useTypedSelector(state => state.auth);
  return <>{auth ? <PublicRoutes /> : <PrivateRoutes />}</>;
};

export default AllRoutes;
