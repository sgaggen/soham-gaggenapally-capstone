import axios from 'axios';


function Search() {

    async function handleFormSubmition (event) {
        event.preventDefault();

        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/search/${event.target.search.value}`);
            console.log(response.data.tracks.items[0].name);
        } catch (error) {
            console.log("search didn't work from client:", error)
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
                />
            </form>

        </div>
    )
}

export default Search;