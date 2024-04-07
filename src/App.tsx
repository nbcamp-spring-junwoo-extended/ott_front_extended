import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/auth/Login.tsx';
import Home from './pages/home.tsx';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      setIsLoggedIn(true);
    } else {
      navigate('/login');
    }
  }, [isLogin]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
