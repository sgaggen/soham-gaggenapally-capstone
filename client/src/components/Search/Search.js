import axios from 'axios';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Playlists from '../Playlists/Playlists';
import PlaylistChoices from '../PlaylistChoices/PlaylistChoices';


function Search({ updater }) {
    const [results, setResults] = useState([])
    const navigate = useNavigate();
    const [showPlaylistChoices, setShowPlaylistChoices] = useState(false)
    const [chosenSong, setChosenSong] = useState("")
    // const [playlists, setPlaylists] = useState([])
    // let playlists = [];

    // useEffect(() => console.log("in useeffect for search for showing playlist options"), [showPlaylistChoices])

    async function handleSearch(event) {
        event.preventDefault();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/${event.target.search.value}`);
            console.log(response.data.tracks.items);
            setResults(response.data.tracks.items);

            // event.target.reset();
        } catch (error) {
            console.log("search didn't work from client:", error)
        }
    }

    async function handleAddClick(info) {

        // if the user isn't logged in take them to login or sign up
        if (!window.sessionStorage.getItem("userId")) {
            alert("Please sign up or login to add songs.")
            navigate('/login');
            return
        }

        setChosenSong(info.id);
        setShowPlaylistChoices(true);
        // getPlaylists();
        // createPlaylistOptions();

        const activityData = {
            user_id: window.sessionStorage.getItem("userId"),
            song_id: info.id
        }

        const songData = {
            id: info.id,
            name: info.name,
            artist: info.artists[0].name,
            image: info.album.images[0].url
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/save`, {
                song: songData,
                activity: activityData
            })

            console.log("after tring to post:", response);
            updater("trigger re-render");
            // console.log("after running setUpdate");
        } catch (error) {
            console.log(error);
        }
    }

    // async function getPlaylists() {
    //     if (window.sessionStorage.getItem("userId")) {
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlists/${window.sessionStorage.getItem("userId")}`)
    //             console.log("client getPlaylists:", response.data);
    //             playlists = response.data;
    //             // return response.data
    //         } catch (error) {
    //             console.log("couldn't get activity:", error)
    //         }

    //     }
    // }

    // async function createPlaylistOptions() {
    //     // await getPlaylists(); 

    //     // console.log("client createPlaylistOptions playlists:", playlists);

    //     playlists.map(playlist =>
    //         <div key={playlist.id} onClick={setShowPlaylistChoices(false)}>
    //             <p>
    //                 playlist name: {playlist.playlist_name}
    //             </p>
    //         </div>)

    //     // setShowPlaylistChoices(false);
    // }

    return (
        <div>
            <h3>this is the search bar div</h3>
            <form onSubmit={handleSearch}>
                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    // className={`form__input ${someError && 'form__input--invalid'}`}
                    placeholder="search for a song"
                />
            </form>
            <div>these are the results:
                {results.map(result =>
                    <div key={result.id}>
                        <p>
                            {result.name} by {result.artists[0].name}
                        </p>
                        <button onClick={() => handleAddClick(result)}> + </button>
                    </div>)}
            </div>
            {/* {showPlaylistChoices ? <div>playlists pop up?</div> : ""} */}
            {/* {showPlaylistChoices ? createPlaylistOptions : ""} */}
            {showPlaylistChoices ? <PlaylistChoices updater={setShowPlaylistChoices} song={chosenSong}/> : ""}
        </div>
    )
}

export default Search;