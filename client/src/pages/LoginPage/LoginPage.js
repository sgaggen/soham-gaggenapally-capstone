import './LoginPage.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.sessionStorage.getItem("userId")) {
            // alert("Please sign up or login to add songs.")
            navigate('/home');
            console.log("already logged in");
            return
        }

    }, [])
    // const [update, setUpdate] = useState('');

    // useEffect (() => setUpdate('nothing'), [update]);

    async function handleLogin(event) {
        event.preventDefault();

        try {


            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username: event.target.username.value,
                password: event.target.password.value
            });
            console.log(response.data)

            if (response.data.id) {
                window.sessionStorage.setItem("userId", response.data.id);
                navigate('/home');
            }

            navigate(0) // if bad login just reroute again --> need to change this to better error handling


        } catch (error) {
            // setIsLoginError(true);
            // setErrorMessage(error.response.data.error.message);
            console.log("error logging in somehow:", error);
        }
    };

    return (
        <main className='login'>
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input type="text" name="username" placeholder="username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" />
                </div>
                <input type="submit" className='invisible' />
            </form>
        </main>
    )
}


export default LoginPage;