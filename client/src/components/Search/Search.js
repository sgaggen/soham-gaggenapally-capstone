import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Search({ updater }) {
    const [results, setResults] = useState([])
    const navigate = useNavigate();

    async function handleFormSubmition(event) {
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
            updater("thingy");
            console.log("after running setUpdate");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3>this is the search bar div</h3>
            <form onSubmit={handleFormSubmition}>
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
        </div>
    )
}

export default Search;