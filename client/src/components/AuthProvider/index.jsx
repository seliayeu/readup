import { AuthContext } from '../../authContext'
import { useState, useEffect } from 'react';


const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState()

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("email") && localStorage.getItem("id")) {
      setUser( { email: localStorage.getItem("email"), token: localStorage.getItem("token"), id: localStorage.getItem("id") })
    }
  }, [])


  const login = (user) => (
    setUser(user)
  )

  const logout = (user) => {
    setUser(null)
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;

