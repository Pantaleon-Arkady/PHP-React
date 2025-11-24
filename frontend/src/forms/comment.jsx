import { Form, Button } from "react-bootstrap"


function CommentPost() {

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