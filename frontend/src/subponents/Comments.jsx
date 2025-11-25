import CommentPost from "../forms/comment";


function Comments({ comments, postId }) {

    return (
        <div className="border-top bg-light p-3">
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="border-bottom pb-2 mb-2">
                        <strong>{comment.author_name || "Anonymous"}</strong>
                        <small className="text-muted ms-2">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </small>
                        <p className="mb-0 mt-1">{comment.comment}</p>
                    </div>
                ))
            ) : (
                <p className="text-muted mb-0">No comments yet.</p>
            )}
            <CommentPost
                postId={postId}
            />
        </div>
    )
}

export default Comments;