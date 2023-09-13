import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatus } from '../../store/account/accountSlice';
import { registerUser } from '../../store/account/accountActions';
import { useNavigate } from 'react-router-dom';

const AccountRegister = () => {
  const [userObj, setUserObj] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const { status } = useSelector(state => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearStatus());
  }, []);

  return (
    <div>
      <h3>Register</h3>
      {status === 'error' ? (
        <>
          <h3>Some error occured!</h3>
          <button onClick={() => dispatch(clearStatus())}>Try again</button>
        </>
      ) : (
        <div>
          <input type="email" placeholder="Email" onChange={(e) => setUserObj({ ...userObj, email: e.target.value})} />

          <input type="password" minLength="6" placeholder="Password" onChange={(e) => setUserObj({ ...userObj, password: e.target.value})} />

          <input type="password" minLength="6"  placeholder="Password confirm" onChange={(e) => setUserObj({ ...userObj, passwordConfirm: e.target.value})} />

          <button onClick={() => dispatch(registerUser({ userObj, navigate }))}>Register</button>
        </div>
      )}
    </div>
  )
}

export default AccountRegister