import './PlaylistPage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function PlaylistPage() {
    const [playlist, setPlaylist] = useState([]);
    let { playlistId } = useParams();

    async function getPlaylist() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlist/${playlistId}`);
            setPlaylist(response.data);
        } catch (error) {
            console.log("something wrong client getting playlist:", error)
        }
    }

    useEffect(() => {
        getPlaylist();
    }, [])



    async function handleRemoveClick(songId) {

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/playlist/${songId}`)
            getPlaylist()
        } catch (error) {
            console.log("client error removing song from playlist:", error);
        }
    }


    return (
        <main className='playlist'>
            <h1>this is your {playlist[0]?.playlist_name} playlist</h1>
            <div className='song__results'>these are the songs:
                {playlist.map(song =>
                    <div key={song.id} className='song__row'>
                        <p className='song'>
                            {song.song_name} by {song.song_artist}
                        </p>
                        <button className='button--remove' onClick={() => handleRemoveClick(song.id)}> - </button>
                    </div>
                )}
            </div>
        </main>
    )
}


export default PlaylistPage;