import axios from 'axios';
import { useEffect, useState } from 'react';


function Activity({ update }) {
    const [activity, setActivity] = useState([])

    // async function handleFormSubmition(event) {
    //     event.preventDefault();

    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/${event.target.search.value}`);
    //         console.log(response.data.tracks.items);
    //         setResults(response.data.tracks.items);

    //         // event.target.reset();
    //     } catch (error) {
    //         console.log("search didn't work from client:", error)
    //     }
    // }

    // async function handleAddClick(info) {

    //     console.log(info);
    //     console.log("need to add to user db")
    //     console.log("need to add to activity db")

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API_URL}/save`, info)
    //         console.log("after tring to post:", response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async function getActivity() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/db/activity`)
            // console.log(response.data)
            setActivity(response.data)
        } catch (error) {
            console.log("couldn't get activity:", error)
        }
    }

    useEffect(() => { getActivity() }, [update]);

    if (!activity) return <p>loading activity</p>

    return (
        <div>
            <h3>this is the activity div</h3>
            <div>this is some activity:
                {activity.map(action =>
                    <div key={action.id}>
                        <p>
                            SONG {action.song_id} by USER {action.user_id} at {action.time}
                        </p>
                    </div>)}
            </div>
        </div>
    )
}

export default Activity;