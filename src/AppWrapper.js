import React from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App';

function AppWrapper() {
  const navigate = useNavigate();
  return <App navigate={navigate} />;
}

export default AppWrapper;
