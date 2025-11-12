import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { createPost } from "../service/DataService";
import { useNavigate } from "react-router-dom";

function CreatePost({ show, onClose }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim() && !content.trim()) return;
        try {
            const result = await createPost({
                title, content
            });
            console.log("POST /create-post result:", result);

            if (result.success) {
                setTitle("");
                setContent("");
                onClose();
                navigate("/homepage", { state: { refresh: true } });
            } else {
                console.error(result.error);
            }
        } catch (err) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create a Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="textarea"
                            placeholder="Enter a content here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end mt-3">
                        <Button variant="secondary" onClick={onClose} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreatePost;