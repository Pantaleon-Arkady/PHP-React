import { Form, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../service/DataService";

function EditPost({ show, onClose, post }) {
    if (!post) return null;

    const [title, setTitle] = useState(post.title || "");
    const [content, setContent] = useState(post.content || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { id: post.id, title, content };
        const result = await updatePost(payload);

        if (result.success) {
            onClose();
            navigate("/homepage", { state: { refresh: true } });
        } else {
            alert("Update failed: " + result.error);
        }
    };
    

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end mt-3">
                        <Button variant="secondary" onClick={onClose} className="me-2">
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditPost;
