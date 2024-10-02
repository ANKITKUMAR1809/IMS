import React, { useState } from 'react';
import './css/Login.css';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Progress from '../components/Progress';

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [load,setLoad]=useState(false)
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  const notify = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  const { storeToken, url } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeToken(res_data.token);
        setLogin({ email: "", password: "" });
        setLoad(false)
        notify("Login Successful", true); // Show success notification

        // Delay the navigation to give the toast time to show
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000); // 1-second delay before redirecting
      } else {
        notify("Invalid Credentials", false); // Show error notification
      }
    } catch (error) {
      notify("Server Unreachable", false);
    }
  };

  return (
    <section className='login container'>
      <ToastContainer /> {/* Toast container to display notifications */}
      <div>
        <h1>Login to Your Shop Account</h1>
      </div>

      <form onSubmit={handleLoginSubmit} className='login-form'>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder='user@ims.com'
            value={login.email}
            onChange={handleInput}
            name='email'
            id='email'
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder='password'
            value={login.password}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <button type="submit" className='login-btn'>{load?<Progress/>:"Login"}</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
