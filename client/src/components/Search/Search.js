import axios from 'axios';
import { useState } from 'react';


function Search() {
    const [results, setResults] = useState([])

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
        // console.log(event.target.parentElement.children);
        // console.log(event.target.parentNode);
        // parentElement.query 
        // document.querySelector() // could probably use this instead to find things instead

        console.log(info);
        console.log("need to add to user db")
        console.log("need to add to activity db")

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/test`, info)
            console.log("after tring to post:", response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h3>this is the search bar</h3>
            <form onSubmit={handleFormSubmition}>
                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    // className={`form__input ${warehouseNameError && 'form__input--invalid'}`}
                    placeholder="search for a song"
                // value={warehouseName}
                // onChange={handleInputChange}
                // onChange={handleFormSubmition}
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