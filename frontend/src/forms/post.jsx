import { Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";

function createPost({ show, onClose }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function handleSubmit(e) {

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
                            onChange={(e) => setText(e.target.value)}
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter a content here..."
                            value={content}
                            onChange={(e) => setAnotherValue(e.target.value)}
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

export default createPost;