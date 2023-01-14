import { useContext } from 'react'
import { useLocation, Navigate } from 'react-router'
import { AuthContext } from '../../authContext'

const AuthRestricted = ({ alt, children }) => {
  const auth = useContext(AuthContext) 
  const location = useLocation()

  if (auth.user && auth.user !== {}) {
    console.log(auth.user)
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}

export default AuthRestricted;