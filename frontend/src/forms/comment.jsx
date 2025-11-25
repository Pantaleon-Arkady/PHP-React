import { Form, Button } from "react-bootstrap"
import { createComment } from "../service/DataService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CommentPost({ postId }) {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const userData = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!userData) {
        return <div>Not logged in</div>;
    }
    const userId = userData.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await createComment({
                author_id: userId,
                content: content,
                post_id: postId
            });

            setContent("");
            navigate("/homepage", { state: { refresh: true } });
        } catch (err) {
            console.error("Comment failed:", err);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="border rounded">
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter something here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Form.Control
                    type="hidden"
                    value={postId}
                />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default CommentPost;