import './PlaylistChoices.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';


function PlaylistChoices({updater, song}) {
    const [playlists, setPlaylists] = useState([])

    // async function handleFormSubmition(event) {
    //     event.preventDefault();

    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/${event.target.search.value}`);
    //         console.log(response.data.tracks.items);
    //         setResults(response.data.tracks.items);

    //         // event.target.reset();
    //     } catch (error) {
    //         console.log("search didn't work from client:", error)
    //     }
    // }

    // async function handleAddClick(info) {

    //     console.log(info);
    //     console.log("need to add to user db")
    //     console.log("need to add to activity db")

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API_URL}/save`, info)
    //         console.log("after tring to post:", response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }




    async function getPlaylists() {
        if (window.sessionStorage.getItem("userId")) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/${window.sessionStorage.getItem("userId")}/playlists`)
                // console.log(response.data)
                setPlaylists(response.data)
            } catch (error) {
                console.log("couldn't get activity:", error)
            }

        }
    }


    async function handleAddToPlaylist (playlistId) {
        console.log("client received group id:", playlistId);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/playlist/${playlistId}`, {
                playlist_group_id: playlistId,
                song_id: song
            });
            console.log("client saving to playlist:", response.data)
            
            updater(false);
        } catch (error) {
            console.log ("client error saving to playlist:", error)
        }



    }


    useEffect(() => { getPlaylists() }, []);


    // if the user isn't logged in, don't show anything
    if (!window.sessionStorage.getItem("userId")) {
        return
    }

    // otherwise if we're still fetching the user's playlist then say so
    if (!playlists) return <p>loading your playlists</p>

    return (
        <div className='playlist-modal'>
            <div>which playlist would you like to save this song to?
                {playlists.map(playlist =>
                    <div key={playlist.id} onClick={() => handleAddToPlaylist(playlist.playlist_group_id)}>
                        <p className='playlist-modal__result'>
                            playlist name: {playlist.playlist_name}
                        </p>
                    </div>)}
            </div>
        </div>
    )
}

export default PlaylistChoices;