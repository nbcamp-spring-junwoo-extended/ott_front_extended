import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  });

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};

export default LogoutScreen;

// 1. 쉬운방법
// setInterval

// 2. 어려운방법, 정확한 방법
// axios
