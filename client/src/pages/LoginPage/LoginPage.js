import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

function LoginPage() {
    const navigate = useNavigate();
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
            <h1>LOGIN</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <input type="text" name="username" placeholder="username" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" />
                </div>
                <input type="submit" /> {/* this needs to be changed to display none */}

                {/* <button type="submit">
                    Login
                </button> */}
            </form>
        </main>
    )
}


export default LoginPage;