import './HomePage.scss';
import { useEffect, useState } from "react";
import Activity from "../../components/Activity/Activity";
import Playlists from "../../components/Playlists/Playlists";

function HomePage({ songPicker }) {
    const [update, setUpdate] = useState('');

    useEffect(() => setUpdate('nothing'), [update]);

    return (
        <main className="home">
            <section className="home__content">
                <Activity update={update} songPicker={songPicker} />
                <Playlists />
            </section>
        </main>
    )
}


export default HomePage;