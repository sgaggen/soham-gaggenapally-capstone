import './Search.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();
    const [autocomplete, setAutocomplete] = useState([]);

    function handleSearch(event) {
        event.preventDefault();
        setAutocomplete([]);
        navigate(`/search/${event.target.search.value}`);
        event.target.reset();
        return
    }

    function handleBlur() {
        setTimeout(() => setAutocomplete([]), 1000)
        return
    }

    function clearSearch() {
        const form = document.querySelector(".search-bar__form");
        form.reset();
        setAutocomplete([]);
    }

    async function handleInputChange(event) {

        if (event.target.value === "") setAutocomplete([]);
        else {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auto/${event.target.value}`);
                setAutocomplete(response.data.results);
            } catch (error) {
                console.log('client error in auto complete:', error);
            }

        }

    }


    return (
        <div className='search-bar'>
            <form className='search-bar__form' onSubmit={handleSearch}>
                <label htmlFor="search" className='invisible'>Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="search for a song"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </form>
            <div className='autocomplete'>
                {autocomplete.map(result =>
                    <Link
                        to={`/search/${result}`}
                        key={uuidv4()}
                        onClick={clearSearch}
                        className='autocomplete__result'
                    >
                        {result}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Search;