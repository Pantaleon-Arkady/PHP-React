import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { createAccount } from "../service/UserService";

function RegisterForm({ onCreate }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!username.trim() && !email.trim() && !password.trim()) return;

        try {

            const result = await createAccount({ 
                username, email, password
            });
            console.log("POST /user-register result:", result);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Control
                type="email"
                placeholder="Enter your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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