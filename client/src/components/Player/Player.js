import './Player.scss';
import { Spotify } from 'react-spotify-embed';

function Player({ songId }) {
    return (
        <article className='player'>
            {songId ? <Spotify wide link={`https://open.spotify.com/track/${songId}`} /> : ""}
        </article>

    )
}

export default Player;