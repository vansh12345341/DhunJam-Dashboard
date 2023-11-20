import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";

import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
      const response = await axios.post('https://stg.dhunjam.in/account/admin/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userId', response.data.data.id);
      history('/dashboard');
  };

  
  return (
    <div className="container">
      <h1 className="heading">Venue Admin Login</h1>
      <form>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>Sign in</button>
      </form>
      <div>
        New Registration?
      </div>
    </div>
  );
};

export default LoginForm;
