import { deletePost, likePost, dislikePost } from "../service/DataService";
import { useNavigate } from "react-router-dom";
import EditPost from "../forms/edit";
import { useState } from "react";

function PostList({ posts }) {
    if (!Array.isArray(posts) || posts.length === 0) {
        return <div>No posts available.</div>;
    }

    const [editPost, setEditPost] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showComments, setShowComments] = useState({});
    const navigate = useNavigate();

    const userData = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!userData) {
        return <div>Not logged in</div>;
    }
    const userId = userData.id;

    const handleEdit = (post) => {
        setSelectedPost(post);
        setEditPost(true);
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            navigate("/homepage", { state: { refresh: true } });
        } catch (err) {
            alert("Error deleting post: " + err.message);
        }
    };

    const handleLike = async (postId) => {
        try {
            await likePost({ author: userId, post: postId });
            navigate("/homepage", { state: { refresh: true } });
        } catch (err) {
            console.error("Like failed:", err);
        }
    };

    const handleDislike = async (postId) => {
        try {
            await dislikePost({ author: userId, post: postId });
            navigate("/homepage", { state: { refresh: true } });
        } catch (err) {
            console.error("Dislike failed:", err);
        }
    };

    const toggleComments = (postId) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    return (
        <>
            <div className="mb-3">User: {userId}</div>

            {posts.map((post) => (
                <div key={post.id} className="each_content_div border mt-3 mb-3">

                    {/* Header */}
                    <div className="each_content_top border w-100 d-flex justify-content-between p-2">
                        <div className="d-flex flex-column">
                            <div>
                                <strong>{post.author_name || "Unknown User"}</strong> (ID: {post.author_id})
                            </div>
                            <div className="text-muted small">
                                {new Date(post.created_at).toLocaleDateString()} {" "}
                                {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                        <div className="dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle btn-sm"
                                data-bs-toggle="dropdown"
                            >
                                Mod
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item" onClick={() => handleEdit(post)}>
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={() => handleDelete(post.id)}>
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="each_contents_content border w-100 p-3">
                        <h5>{post.title}</h5>
                        <p className="mb-0">{post.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="each_content_bottom border w-100 d-flex gap-3 p-3 align-items-center">
                        <button onClick={() => handleLike(post.id)} className="btn btn-outline-success btn-sm">
                            <img src="/like.svg" alt="Like" width="20" /> ({post.like_count})
                        </button>
                        <button onClick={() => handleDislike(post.id)} className="btn btn-outline-danger btn-sm">
                            <img src="/dislike.svg" alt="Dislike" width="20" /> ({post.dislike_count})
                        </button>
                        <button onClick={() => toggleComments(post.id)} className="btn btn-outline-secondary btn-sm ms-auto">
                            Comments ({post.comments?.length || 0}) {showComments[post.id] ? "↑" : "↓"}
                        </button>
                    </div>

                    {/* Comments Dropdown */}
                    {showComments[post.id] && (
                        <div className="border-top bg-light p-3">
                            {post.comments && post.comments.length > 0 ? (
                                post.comments.map((comment) => (
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
                        </div>
                    )}
                </div>
            ))}

            {/* Edit Modal */}
            {selectedPost && (
                <EditPost
                    show={editPost}
                    onClose={() => setEditPost(false)}
                    post={selectedPost}
                />
            )}
        </>
    );
}

export default PostList;