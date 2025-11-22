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
    const navigate = useNavigate();

    const handleEdit = (post) => {
        setEditPost(true);
        setSelectedPost(post);
    };

    async function handleDelete(postId) {
        try {
            const res = await deletePost(postId);
            console.log("DELETE /posts?id=", postId, "result:", res);

            navigate("/homepage", { state: { refresh: true } });
        } catch (err) {
            console.error("DELETE /posts error:", err);
            alert("Error deleting: " + err.message);
        }
    }

    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    const userId = user.id;

    async function handleLike(postId) {
        try {

            const res = await likePost({
                author: userId,
                post: postId
            });
            console.log("liking post with id: ". postId, ", liked by author:", userId, "");

            navigate("/homepage", { state: { refresh: true } });
        } catch (err) {
            console.log("Error liking post, error:", err);
        }
    }
    
    async function handleDislike(postId) {
        try {

            const res = await dislikePost({
                author: userId,
                post: postId
            });
            console.log("disliking post with id: ". postId, ", disliked by author:", userId, "");

            navigate("/homepage", { state: { refresh: true } });
        } catch (err) {
            console.log("Error disliking post, error:", err);
        }
    }

    return (
        <>
            <div>User: {userId}</div>
            {posts.map((post, index) => (
                <div key={index} className="each_content_div border mt-3 mb-3">
                    <div className="each_content_top border w-100 d-flex justify-content-between p-2">
                        <div className="border d-flex flex-column">
                            <div>User ID: {post.author}</div>
                            <div>
                                {new Date(post.created_at).toLocaleDateString()}{" "}
                                {new Date(post.created_at).toLocaleTimeString()}
                            </div>
                        </div>
                        <div className="dropdown">
                            <button
                                type="button"
                                className="btn btn-primary dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                Mod
                            </button>

                            <ul className="dropdown-menu">
                                <li><button onClick={() => handleEdit(post)}>Edit</button></li>
                                <li><button onClick={() => handleDelete(post.id)}>Delete</button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="each_contents_content border w-100 p-2">
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                    </div>

                    <div className="each_content_bottom border w-100">
                        <button onClick={() => handleLike(post.id)}>
                            <img src="../../public/like.svg" />
                            <span>({post.like_count})</span>
                        </button>
                        <button onClick={() => handleDislike(post.id)}>
                            <img src="../../public/dislike.svg" />
                            <span>({post.dislike_count})</span>
                        </button>
                    </div>
                </div>
            ))}
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
