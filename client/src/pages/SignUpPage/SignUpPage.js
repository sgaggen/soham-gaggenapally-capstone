import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

function SignUpPage() {
    const navigate = useNavigate();
    // const [update, setUpdate] = useState('');

    // useEffect (() => setUpdate('nothing'), [update]);

    async function handleSignup (event) {
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
                username: event.target.username.value,
                password: event.target.password.value,
                email: event.target.email.value,
                name: "BLANK"
            });
            console.log("signuppage end of try:", response.data)

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
            <h1>SIGN UP</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <input type="text" name="username" placeholder="username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" />
                </div>
                <div>
                    <input type="text" name="email" placeholder="email" />
                </div>
                <input type="submit" /> {/* this needs to be changed to display none */}

                {/* <button type="submit">
                    Sign Up
                </button> */}
            </form>
        </main>
    )
}


export default SignUpPage;