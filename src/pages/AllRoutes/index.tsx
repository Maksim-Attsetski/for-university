import { FC } from 'react';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AllRoutes: FC = () => {
  const auth = true;
  return <>{auth ? <PublicRoutes /> : <PrivateRoutes />}</>;
};

export default AllRoutes;
