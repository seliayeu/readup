import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../../authContext';

const AuthRequired = ({ alt, children }) => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}

export default AuthRequired;