import { useEffect, useState } from "react";
import Activity from "../../components/Activity/Activity";
import Search from "../../components/Search/Search";
import Playlists from "../../components/Playlists/Playlists";

function HomePage() {
    const [update, setUpdate] = useState('');

    useEffect(() => setUpdate('nothing'), [update]);

    return (
        <main>
            <h1>home page yay</h1>
            <Search updater={setUpdate} />
            <Activity update={update} />
            <Playlists />
        </main>
    )
}


export default HomePage;