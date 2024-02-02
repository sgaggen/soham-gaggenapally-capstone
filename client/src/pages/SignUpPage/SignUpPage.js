import './SignUpPage.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

function SignUpPage() {
    const navigate = useNavigate();

    async function handleSignup(event) {
        event.preventDefault();

        try {


            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
                name: event.target.name.value,
                username: event.target.username.value,
                password: event.target.password.value,
                email: event.target.email.value,
            });
            console.log("signuppage end of try:", response.data)

            if (response.data.id) {
                window.sessionStorage.setItem("userId", response.data.id);
                navigate('/home');
            }

            navigate(0)

        } catch (error) {
            // setIsLoginError(true);
            // setErrorMessage(error.response.data.error.message);
            console.log("error logging in somehow:", error);
        }
    };

    return (
        <main className='signup'>
            <h1>SIGN UP</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <input type="text" name="username" placeholder="username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" />
                </div>
                <div>
                    <input type="text" name="name" placeholder="name" />
                </div>
                <div>
                    <input type="text" name="email" placeholder="email" />
                </div>
                <input type="submit" className='invisible' /> {/* this needs to be changed to display none */}

                {/* <button type="submit">
                    Sign Up
                </button> */}
            </form>
        </main>
    )
}


export default SignUpPage;