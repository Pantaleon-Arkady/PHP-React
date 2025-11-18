function PostList({ posts }) {
    if (!Array.isArray(posts) || posts.length === 0) {
        return <div>No posts available.</div>;
    }

    return (
        <>
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
                                <li><button>Edit</button></li>
                                <li><button>Delete</button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="each_contents_content border w-100 p-2">
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                    </div>

                    <div className="each_content_bottom border w-100"></div>
                </div>
            ))}
        </>
    );
}

export default PostList;
