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
        </section>
    )
}

export default Comments;