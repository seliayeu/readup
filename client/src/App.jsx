import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/index'
import Home from './pages/Home/index'
import Register from './pages/Register/index'
import AuthProvider from "./components/AuthProvider/index";
import AuthRestricted from "./components/AuthRestricted/index";
import AuthRequired from "./components/AuthRequired/index";
import styled, { css } from 'styled-components'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthRestricted alt="/home"><Login /></AuthRestricted>} />
        <Route path="/home" element={<AuthRequired alt="/login"><Home /></AuthRequired>} />
        <Route path="login" element={<AuthRestricted alt="/home"><Login /></AuthRestricted>} />
        <Route path="register" element={<AuthRestricted alt="/home"><Register /></AuthRestricted>} />
      </Routes>
  </AuthProvider>
  );
}

export default App;
