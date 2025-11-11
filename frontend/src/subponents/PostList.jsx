function PostList({ posts }) {

    return (
        <>
            {posts.map((post) => (
                <div key={index} className="each_content_div border  mt-3 mb-3">
                    <div className="each_content_top border w-100 d-flex justify-content-betweeen">
                        <div>user id: {post.author}</div>
                        <div>
                            { new Date(post.date).toLocaleDateString() } { new Date(post.date).toLocaleTimeString() }
                        </div>
                    </div>
                    <div className="each_contents_content border w-100">
                        <div className="border w-100">{post.title}</div>
                        <div className="border w-100">{post.content}</div>
                    </div>
                    <div className="each_content_bottom border w-100"></div>
                </div>
            ))};
        </>
    )
}

export default PostList;