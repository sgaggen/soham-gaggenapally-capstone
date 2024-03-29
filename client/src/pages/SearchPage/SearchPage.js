import './SearchPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlaylistChoices from '../../components/PlaylistChoices/PlaylistChoices';


function SearchPage() {
    const query = useParams().query;
    const [results, setResults] = useState(null)
    const navigate = useNavigate();
    const [showPlaylistChoices, setShowPlaylistChoices] = useState(false)
    const [chosenSong, setChosenSong] = useState("")

    async function conductSearch(query) {

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/${query}`);
            setResults(response.data.tracks.items);

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
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        conductSearch(query);
    }, [query])

    if (!results) return <p>loading results...</p>;

    return (
        <main className='search'>
            {showPlaylistChoices ? <PlaylistChoices updater={setShowPlaylistChoices} song={chosenSong} /> : ""}
            <h1>results for {query}</h1>
            <section className='song__results'>
                {results.map(result =>
                    <div key={result.id} className='song__row'>
                        <p className='song'>
                            {result.name} by {result.artists[0].name}
                        </p>
                        <button className="button--add" onClick={() => handleAddClick(result)}> + </button>
                    </div>)}
            </section>
        </main>
    )
}

export default SearchPage;