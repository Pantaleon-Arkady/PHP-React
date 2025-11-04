import { Form, Button } from "react-bootstrap";

function RegisterForm() {

    const handleSubmit = () => {
        
    };

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            {/* Example Input Field */}
            <Form.Control
                type="text"                // e.g. "text", "number", "date"
                placeholder="Enter something here..."                  // optional, focuses this input first
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="Another field..."
            />
        </Form.Group>

        <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" className="me-2">
                Cancel
            </Button>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </div>
    </Form>
    )
}

export default RegisterForm;