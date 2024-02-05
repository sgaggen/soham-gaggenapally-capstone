import axios from 'axios';
import './Comments.scss'
import { v4 as uuidv4 } from 'uuid';

function Comments({ existingComments, activityId, updater }) {
    async function handleCommentSubmit(event) {
        event.preventDefault();
        // const data = {
        //     user_id: window.sessionStorage.getItem("userId"),
        //     content: event.target.commentInput.value,
        //     activity_id: activityId
        // }
        // console.log(data)

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/db/comments`, {
                user_id: window.sessionStorage.getItem("userId"),
                content: event.target.commentInput.value,
                activity_id: activityId
            });
            console.log('client end of posting a commment:', response.data)
            event.target.reset();
            updater(`updating from comments ${uuidv4()}`) // using uuid to force new update to the activity component
        } catch (error) {
            console.log('client error posting a comment:', error)
        }
    }

    return (
        <section className='comments'>
            {existingComments ? existingComments.map(comment =>
                <article key={comment.comment_id} className='comment'>
                    {`${comment.comment_user_name} said: ${comment.comment_content}`}
                </article>
            ) : null}

            {/* <div className='comment__add'>+</div> */}
            
            <form className='comment__form' onSubmit={handleCommentSubmit}>
                <label htmlFor="comment-input" className='invisible'>Search</label>
                <input
                    type="text"
                    name="commentInput"
                    id="comment-input"
                    className='comment-input'
                    // className={`form__input ${someError && 'form__input--invalid'}`}
                    placeholder="add a comment"
                // onChange={handleInputChange}
                // onBlur={handleBlur}
                />
            </form>
        </section>
    )
}

export default Comments;