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
        return
    }

    function clearSearch() {
        const form = document.querySelector(".search-bar__form");
        console.log(form)
        form.reset();
        setAutocomplete([]);
    }

    async function handleInputChange(event) {
        // const { name, value } = event.target;
        // console.log('client in handleinput change, input:', event.target.value);
        // console.log(name,value)


        if (event.target.value === "") setAutocomplete([]);
        else {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auto/${event.target.value}`);
                // console.log("input:", event.target.value, response.data.results)
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
                    // className={`form__input ${someError && 'form__input--invalid'}`}
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
                        // onClick={() => setAutocomplete([])}
                        onClick={clearSearch}
                        // className='autocomplete__result button--add song'
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