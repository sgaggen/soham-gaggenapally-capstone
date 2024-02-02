

function Comments ({existingComments}) {
    return (
        <section>
            {existingComments ? existingComments.map(comment => 
                <article key={comment.id}>
                    {comment.comment_content}
                </article>
            ) : null}

            <div>this is the comments div yay - add a new comment here</div>
        </section>
    )
}

export default Comments;