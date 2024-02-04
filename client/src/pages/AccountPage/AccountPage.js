import './AccountPage.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

function AccountPage() {
    const [user, setUser] = useState([])
    const [initial, setInitial] = useState([])

    async function getUser() {
        console.log("in getuser")
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${window.sessionStorage.getItem("userId")}`);
            setUser(response.data);
            setInitial(response.data);
        } catch (error) {
            console.log("something wrong client getting user info:", error)
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    async function handleUpdateAccount(event) {
        event.preventDefault();

        try {
            console.log(event.target);

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/${window.sessionStorage.getItem("userId")}`, {
                name: event.target.name.value || initial.name,
                username: event.target.username.value || initial.username,
                password: event.target.password.value || initial.password,
                email: event.target.email.value || initial.email
            });
            console.log(response.data)



            getUser();
            event.target.reset();

        } catch (error) {
            console.log("error client updating account:", error);
        }
    };

    function handleChange(event) {
        console.log("target:",event.target)
        const { name, value } = event.target;
        setUser({...user, [name]: value});
        console.log(user)
    }

    // use another div to show the actual info and put the editing part to the right
    return (
        <main className='account'>
            <h1>hi, {initial.name}</h1>
            <form onSubmit={handleUpdateAccount}> 
                <fieldset>
                    <legend>edit your details below</legend>
                    <div className='account__edit-field'>
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" placeholder={`current: ${initial.username}`} value={user.username} onChange={handleChange}/>
                    </div>
                    <div className='account__edit-field'>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" placeholder={`password`} onChange={handleChange} />
                    </div>
                    <div className='account__edit-field'>
                        <label htmlFor="name">name</label>
                        <input type="text" name="name" placeholder={`current: ${initial.name}`} value={user.name} onChange={handleChange} />
                    </div>
                    <div className='account__edit-field'>
                        <label htmlFor="email">email</label>
                        <input type="text" name="email" placeholder={`current: ${initial.email}`} value={user.email} onChange={handleChange} />
                    </div>
                    <input type="submit" className='invisible' />
                </fieldset>
            </form>
        </main>
    )
}


export default AccountPage;