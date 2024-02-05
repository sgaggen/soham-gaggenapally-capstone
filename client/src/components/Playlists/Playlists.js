import './Playlists.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [showAddPlaylist, setShowAddPlaylist] = useState(false)

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

    async function handleAddPlaylist (event) {
        event.preventDefault();
        const name = event.target.playlistsInput.value;
        const id = window.sessionStorage.getItem("userId");

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/playlist`, {
                user_id: id,
                playlist_name: name,
                playlist_group_id: name.replace(/ /g, "_") + "_" + id
            });
            console.log('client end of creating a playlist:', response.data)
            event.target.reset();
            setShowAddPlaylist(false);
            getPlaylists();
        } catch (error) {
            console.log('client error creating a playlist:', error)
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
        <div className='playlists'>
            <h1>playlists</h1>
            <div className='song__results'>these are your playlists:
                {playlists.map(playlist =>
                    <div key={playlist.id}>
                        {/* <p>
                            playlist name: {playlist.playlist_name}
                        </p> */}
                        <Link to={`/playlist/${playlist.playlist_group_id}`} className='song'>{playlist.playlist_name}</Link>
                    </div>
                )}

                {showAddPlaylist ?
                    <form className='playlists__form' onSubmit={handleAddPlaylist} onBlur={() => setShowAddPlaylist(false)}>
                        <label htmlFor="playlists-input" className='invisible'>Search</label>
                        <input
                            type="text"
                            name="playlistsInput"
                            id="playlists-input"
                            className='playlists-input'
                            placeholder="enter a name"
                        />
                    </form>
                    :
                    <button className="song button--add" onClick={() => setShowAddPlaylist(true)}>+</button>
                }
            </div>
        </div>
    )
}

export default Playlists;