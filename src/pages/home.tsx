import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
