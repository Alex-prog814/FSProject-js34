import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateToken, logout, isUserLogin } from '../../helpers/functions';

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    updateToken();
  }, []);

  return (
    <div>
      <button onClick={() => navigate('/')}>Home</button>
      {isUserLogin() ? (
        <>
          <button onClick={() => navigate('/product-create')}>Create Product</button>
          <button onClick={() => {
            logout();
            navigate('/');
          }}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => navigate('/login')}>Login</button>
        </>
      )}
    </div>
  )
}

export default Navbar