import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";

function AccountPage() {
    const [user, setUser] = useState([])

    async function getUser() {
        console.log("in getuser")
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${window.sessionStorage.getItem("userId")}`);
            setUser(response.data);
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
                name: event.target.name.value || user.name,
                username: event.target.username.value || user.username,
                password: event.target.password.value || user.password,
                email: event.target.email.value || user.email
            });
            console.log(response.data)



            getUser();
            event.target.reset();

        } catch (error) {
            console.log("error client updating account:", error);
        }
    };
    // use another div to show the actual info and put the editing part to the right
    return (
        <main>
            <h1>hi, {user.name}</h1>
            <form onSubmit={handleUpdateAccount}> 
                <fieldset>
                    <legend>Edit your details below</legend>
                    <div>
                        <input type="text" name="name" placeholder={`name: ${user.name}`} />
                    </div>
                    <div>
                        <input type="text" name="username" placeholder={`username: ${user.username}`} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder={`password`} />
                    </div>
                    <div>
                        <input type="text" name="email" placeholder={`email: ${user.email}`} />
                    </div>
                    <input type="submit" /> {/* this needs to be changed to display none */}
                </fieldset>
            </form>
        </main>
    )
}


export default AccountPage;