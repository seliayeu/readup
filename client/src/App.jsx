import './App.css';
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import Landing from './pages/Landing/index'
import Login from './pages/Login/index'
import Home from './pages/Home/index'
import Register from './pages/Register/index'
import { AuthContext } from './authContext'
import { Navigate, useLocation } from 'react-router';
import authServices from './services/authService';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthRestricted alt="/home"><Landing /></AuthRestricted>} />
        <Route path="/home" element={<AuthRequired alt="/login"><Home /></AuthRequired>} />
        <Route path="login" element={<AuthRestricted alt="/home"><Login /></AuthRestricted>} />
        <Route path="register" element={<AuthRestricted alt="/home"><Register /></AuthRestricted>} />
      </Routes>
  </AuthProvider>
  );
}

const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState()

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"))
    }
  }, [])


  const login = (user, callback) => (
    authServices.login(user, () => {
      setUser(user)
      callback()
    })
  )

  const logout = (user, callback) => {
    setUser(null)
    callback()
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const AuthRequired = ({ alt, children }) => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}

const AuthRestricted = ({ alt, children }) => {
  const auth = useContext(AuthContext) 
  const location = useLocation()

  if (auth.user && auth.user !== {}) {
    console.log(auth.user)
    return <Navigate to={`${alt}`} state={location} replace />
  }

  return children
}

export default App;
