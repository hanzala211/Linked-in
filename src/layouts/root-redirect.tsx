import { Loader } from '@components';
import { useAuth } from '@context';
import { Navigate } from 'react-router-dom';

export const RootRedirect: React.FC = () => {
  const { isMainPageLoading } = useAuth()
  const token = localStorage.getItem('token');
  return isMainPageLoading ? <Loader /> : token ? <Navigate to="/feed" replace /> : <Navigate to="/login" replace />;
};

