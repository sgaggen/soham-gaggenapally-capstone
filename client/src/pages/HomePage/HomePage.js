import './HomePage.scss';
import { useEffect, useState } from "react";
import Activity from "../../components/Activity/Activity";
import Search from "../../components/Search/Search";
import Playlists from "../../components/Playlists/Playlists";

function HomePage() {
    const [update, setUpdate] = useState('');

    useEffect(() => setUpdate('nothing'), [update]);

    return (
        <main className="home">
            {/* <h1>home page yay</h1> */}
            <article className="home__search">
                <Search updater={setUpdate} />
            </article>
            <section className="home__content">
                <Activity update={update} />
                <Playlists />
            </section>
        </main>
    )
}


export default HomePage;