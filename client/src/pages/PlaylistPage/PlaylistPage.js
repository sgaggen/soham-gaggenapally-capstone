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
            console.log("client getting playlist:", response.data);
        } catch (error) {
            console.log("something wrong client getting playlist:", error)
        }
    }

    useEffect(() => {
        getPlaylist();
    }, [])



    async function handleRemoveClick(songId) {

        // // if the user isn't logged in take them to login or sign up
        // if (!window.sessionStorage.getItem("userId")) {
        //     alert("Please sign up or login to add songs.")
        //     navigate('/login');
        //     return
        // }

        // setChosenSong(info.id);
        // setShowPlaylistChoices(true);
        // // getPlaylists();
        // // createPlaylistOptions();

        // const activityData = {
        //     user_id: window.sessionStorage.getItem("userId"),
        //     song_id: info.id
        // }

        // const songData = {
        //     id: info.id,
        //     name: info.name,
        //     artist: info.artists[0].name,
        //     image: info.album.images[0].url
        // }

        console.log("client top of handleremoveclick");

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/playlist/${songId}`)

            console.log("after tring to delete:", response);
            // updater("trigger re-render");
            getPlaylist()
            console.log("client end of try of remove song");
        } catch (error) {
            console.log("client error removing song from playlist:", error);
        }
    }


    return (
        <main>
            <h1>this is your [CHANGE TO DYNAMIC NAME] playlist</h1>
            <div>these are the results:
                {playlist.map(song =>
                    <div key={song.id}>
                        <p>
                            SONG {song.song_id}
                        </p>
                        <button onClick={() => handleRemoveClick(song.id)}> - </button>
                    </div>)}
            </div>
        </main>
    )
}


export default PlaylistPage;