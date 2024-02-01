import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react";


function PlaylistPage() {
    const [playlist, setPlaylist] = useState([])
    let { playlistId } = useParams();

    async function getPlaylist() {
        // console.log("in getuser") 
        try {
            // need to add handling here to check user has access to the playlist they've clicked
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/${playlistId}`);
            setPlaylist(response.data);
            console.log("client getting playlist:",response.data);
        } catch (error) {
            console.log("something wrong client getting playlist:", error)
        }
    }

    useEffect(() => {
        getPlaylist();
    }, [])


    // async function handleUpdateAccount(event) {
    //     event.preventDefault();
    //     try {
    //         console.log(event.target);
    //         const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/${window.sessionStorage.getItem("userId")}`, {
    //             name: event.target.name.value || user.name,
    //             username: event.target.username.value || user.username,
    //             password: event.target.password.value || user.password,
    //             email: event.target.email.value || user.email
    //         });
    //         console.log(response.data)
    //         getPlaylist();
    //         event.target.reset();
    //     } catch (error) {
    //         console.log("error client updating account:", error);
    //     }
    // };

    return (
        <main>
            <h1>this to your [CHANGE TO DYNAMIC NAME] playlist</h1>
            <div>these are the results:
                {playlist.map(song =>
                    <div key={song.id}>
                        <p>
                            SONG {song.song_id}
                        </p>
                        <button onClick={() => console.log("client need to handle remove click")}> - </button>
                    </div>)}
            </div>
        </main>
    )
}


export default PlaylistPage;