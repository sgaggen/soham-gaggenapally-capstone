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

    // function clearSearch() {
    //     const input = document.querySelector("#search");
    //     // input.reset();
    // }

    async function handleInputChange(event) {
        // const { name, value } = event.target;
        // console.log('client in handleinput change, input:', event.target.value);
        // console.log(name,value)


        if (event.target.value === "") setAutocomplete([]);
        else {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/auto/${event.target.value}`);
                console.log("input:", event.target.value, response.data.results)
                setAutocomplete(response.data.results);
            } catch (error) {
                console.log('client error in auto complete:', error);
            }
            
        }

    }


    return (
        <div>
            <form onSubmit={handleSearch}>
                <label htmlFor="search" className='invisible'>Search</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    // className={`form__input ${someError && 'form__input--invalid'}`}
                    placeholder="search for a song"
                    onChange={handleInputChange}
                />
            </form>
            <div>
                {autocomplete.map(result => <Link to={`/search/${result}`} key={uuidv4()} onClick={() => setAutocomplete([])}>{result}</Link>)}
            </div>
        </div>
    )
}

export default Search;