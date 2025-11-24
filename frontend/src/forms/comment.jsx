import { Form, Button } from "react-bootstrap"


function CommentPost({ postId }) {

const handleSubmit = async () => {
};

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter something here..."
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