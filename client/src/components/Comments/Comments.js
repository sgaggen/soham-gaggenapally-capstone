import './Comments.scss'

function Comments ({existingComments}) {
    return (
        <section className='comments'>
            {existingComments ? existingComments.map(comment => 
                <article key={comment.comment_id} className='comment'>
                    {`${comment.comment_user_name} said: ${comment.comment_content}`}
                </article>
            ) : null}

            <div className='comment__add'>+</div>
            <form className='comment__form' onSubmit={console.log}>
                <label htmlFor="comment-input" className='invisible'>Search</label>
                <input
                    type="text"
                    name="comment-input"
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