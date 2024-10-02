import React, { useState } from 'react'
import './css/Register.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate()

    const [register, setRegister] = useState({
        shopname: "",
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setRegister(
            {
                ...register,
                [name]: value,
            })

    }
    const notify = (msg, success) => {
        if (success) {
            toast.success(msg);
        } else {
            toast.error(msg);
        }
    };
    const onRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log(register)
        try {
            const response = await fetch("https://ims-yxa0.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(register)
            })
            console.log(response)
            if (response.ok) {
                notify("Registeration Successfull", true);
                setRegister({
                    shopname: "",
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate('/login');
                    
                }, 1500);
            }
            else {
                notify("Invalid Input please registration again", false);
            }
        } catch (error) {
            notify("Server Unreachable",false);
        }
    }
    return (
        <section className='register'>
            <ToastContainer/>
            <div>
                <h1>Register your Shop with IMS</h1>
            </div>

            <form onSubmit={onRegisterSubmit} className='register-form'>
                <div>
                    <label htmlFor="shopname">Shop Name</label>
                    <input type="text"
                        name="shopname"
                        id='shopname'
                        value={register.shopname}
                        onChange={handleInput}
                        placeholder='Anil Handloom'
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                        placeholder='user@ims.com'
                        value={register.email}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        name='password'
                        id='password'
                        value={register.password}
                        onChange={handleInput}
                        placeholder='password'
                    />
                </div>
                <div>
                    <button type="submit" className='register-btn'>Sign Up</button>
                </div>
            </form>
        </section>
    )
}

export default Register