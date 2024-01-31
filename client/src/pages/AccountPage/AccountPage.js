import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

function AccountPage() {
    const navigate = useNavigate();

    useEffect(() => {
        //need to use this to fetch the account details to either display or further update/modify

    }, [])
    // const [update, setUpdate] = useState('');

    // useEffect (() => setUpdate('nothing'), [update]);

    async function handleLogin (event) {
        event.preventDefault();

        try {
            // const response = await axios.post(loginUrl, {
            //     username: e.target.username.value,
            //     password: e.target.password.value,
            // });
            // sessionStorage.setItem("JWTtoken", response.data.token);

            // setIsLoggedIn(true);
            // setIsLoginError(false);
            // setErrorMessage("");
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username: event.target.username.value,
                password: event.target.password.value
            });
            console.log(response.data)

            if (response.data.id) {
                window.sessionStorage.setItem("userId", response.data.id);
                navigate('/home');
            }

            navigate(0)
            // window.sessionStorage.getItem("key");

        } catch (error) {
            // setIsLoginError(true);
            // setErrorMessage(error.response.data.error.message);
            console.log("error logging in somehow:", error);
        }
    };

    return (
        <main>
            <h1>hi, [username here]</h1>

        </main>
    )
}


export default AccountPage;