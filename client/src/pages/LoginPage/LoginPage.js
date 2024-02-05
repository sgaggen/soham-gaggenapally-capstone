import './LoginPage.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (window.sessionStorage.getItem("userId")) {
            navigate('/home');
            return
        }

    }, [])

    async function handleLogin(event) {
        event.preventDefault();

        try {


            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username: event.target.username.value,
                password: event.target.password.value
            });

            if (response.data.id) {
                window.sessionStorage.setItem("userId", response.data.id);
                navigate('/home');
            }

            navigate(0)

        } catch (error) {
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