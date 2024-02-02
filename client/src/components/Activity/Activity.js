import './Activity.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';


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
        if (window.sessionStorage.getItem("userId")) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/db/activity`);
                setActivity(response.data)
                
            } catch (error) {
                console.log("client couldn't get activity:", error)
            }
        }
    }

    useEffect(() => { getActivity() }, [update]);


    // if the user isn't logged in, don't show data and prompt them to sign up or login
    if (!window.sessionStorage.getItem("userId")) {
        return (
            <div>
                Please <Link to='/login'>log in</Link> or <Link to='/signup'>sign up</Link> to view recent activity.
            </div>
        )
    }

    // otherwise if we're still fetching the activity then say so
    if (!activity) return <p>loading activity</p>

    // console.log("client in activity being sent to comments:", comments);
    return (
        <section className='activity'>
            <h1>activity</h1>
            <div className='song__results'>this is some activity:
                {activity.map(action =>
                    <div key={action.id}>
                        <p className='song'>
                            SONG {action.song_id} by USER {action.user_id} at {action.time} 
                        </p>
                        {/* {action.comments ? <div>comments</div> : ""} */}
                        <Comments existingComments={action.comments} />

                    </div>
                )}
            </div>
        </section>
    )
}

export default Activity;