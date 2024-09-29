import React, { useState } from 'react'
import './css/Login.css'
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [login, setLogin] = useState({ email: "", password: "" })
    const navigate =useNavigate()
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setLogin({
            ...login,
            [name]: value,

        })
    }

    const { storeToken ,url} = useAuth()
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(login)
        try {
            const response = await fetch(`${url}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login)
            });

            if (response.ok) {
                const res_data = await response.json();
                storeToken(res_data.token)
                console.log(response)
                alert("Login Successfully")
                setLogin({
                    email: "", password: ""
                })
                console.log(res_data)
                navigate('/dashboard')
            }
            else {
                alert("Invalid Credentials")
            }
        } catch (error) {

        }
    }
    return (
        <section className='login container'>
            <div>
                <h1>Login in your Shop Account</h1>
            </div>

            <form onSubmit={handleLoginSubmit} className='login-form'>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                        placeholder='user@ims.com'
                        value={login.email}
                        onChange={handleInput}
                        name='email'
                        id='email'
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"
                        placeholder='password'
                        value={login.password}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <button type="submit" className='login-btn'>Login</button>
                </div>
            </form>
        </section>
    )
}

export default Login