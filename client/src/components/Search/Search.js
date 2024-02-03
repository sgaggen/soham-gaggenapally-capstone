import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();
        navigate(`/search/${event.target.search.value}`);
        event.target.reset();
        return
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
                />
            </form>
        </div>
    )
}

export default Search;