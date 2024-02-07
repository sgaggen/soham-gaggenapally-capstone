import './Activity.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Comments from '../Comments/Comments';


function Activity({ songPicker }) {
    const [activity, setActivity] = useState([])
    const [update, setUpdate] = useState("")




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

    function timeFormatter(isoTime) {
        const inputTime = new Date(isoTime);
        return formatDistanceToNow(inputTime, { addSuffix: true });
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

    return (
        <section className='activity'>
            <h1>activity</h1>
            <div className='song__results'>this is some recent activity:
                {activity.map(action =>
                    <div key={action.activity_id}>
                        <p className='song'>
                            <span className='song__link' onClick={() => songPicker(action.activity_song_id)}>{action.song_name}</span> saved by {action.user_name} {timeFormatter(action.activity_time)}
                        </p>
                        <Comments existingComments={action.comments} activityId={action.activity_id} updater={setUpdate}/>

                    </div>
                )}
            </div>
        </section>
    )
}

export default Activity;