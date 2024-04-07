import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../reducer/userSlice.ts';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.clearUser());
    navigate('/');
  });

  return (
    <div>
      <h1>Logout</h1>
    </div>
  );
};

export default Logout;
