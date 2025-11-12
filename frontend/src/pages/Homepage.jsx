import { useState, useEffect } from "react";
import PostList from "../subponents/PostList";
import { getAllData } from "../service/DataService";
import { Button } from "react-bootstrap";
import CreatePost from "../forms/post";

function Homepage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [createPost, setCreatePost] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await getAllData();
                console.log("GET posts data:", result);
    
                if (result.success) {
                    setPosts(Array.isArray(result.data) ? result.data : []);
                } else {
                    setError(result.error || "Unknown API error");
                }
            } catch (err) {
                console.error("GET /posts error:", err);
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="">
            <div className="homepage_head w-100 border d-flex flex-row">
                <div className="homepage_head_one border d-flex justify-content-center align-items-center">
                    <h2>App Name</h2>
                </div>
                <div className="homepage_head_two border d-flex justify-content-center align-items-center">
                    <Button 
                        className="homepage_head_center" 
                        variant="secondary"
                        onClick={() => setCreatePost(true)}
                    >
                        Create a Post?
                    </Button>
                </div>
                <div className="homepage_head_three border d-flex justify-content-around align-items-center">
                    <div className="homepage_head_features border"></div>
                    <div className="homepage_head_features border"></div>
                    <div className="homepage_head_features border"></div>
                </div>
            </div>
            <div className="homepage_body_div border d-flex flex-row">
                <div className="homepage_left border d-flex flex-column">
                    <div className="homepage_left_sections border w-100 d-flex flex-column justify-content-around align-items-center">
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                        <div className="homepage_left_features border"></div>
                    </div>
                    <div className="homepage_left_sections border w-100 d-flex flex-column justify-content-around align-items-center">
                    </div>
                    <div className="homepage_left_sections border w-100 d-flex flex-column justify-content-around align-items-center">
                    </div>
                    <div className="homepage_left_sections border w-100"></div>
                </div>
                <div className="homepage_main_body border d-flex flex-row">
                    <div className="homepage_contents_div border d-flex flex-column align-items-center">
                        {loading && <span>Loading Posts...</span>}
                        {!loading && !error && (
                            <PostList 
                                posts={posts}
                            />
                        )}
                    </div>
                    <div className="homepage_main_side border"></div>
                </div>
            </div>
            <CreatePost 
                show={createPost}
                onClose={() => setCreatePost(false)}
            />
        </div>
    )
}

export default Homepage;