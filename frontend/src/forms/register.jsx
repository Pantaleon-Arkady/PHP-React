import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { createAccount } from "../service/UserService";

function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    function validateForm() {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!username.trim()) {
            newErrors.username = "Username is required.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        return newErrors;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {

            const result = await createAccount({
                username, email, password
            });

            setUsername("");
            setEmail("");
            setPassword("");
            onRegister();

            console.log("POST /user-register result:", result);

        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Enter your email here..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                />
                {errors.email && <div className="text-light bg-danger rounded py-1 px-3 mt-1">{errors.email}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!errors.username}
                />
                {errors.username && <div className="text-light bg-danger rounded py-1 px-3 mt-1">{errors.username}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                />
                {errors.password && <div className="text-light bg-danger rounded py-1 px-3 mt-1">{errors.password}</div>}
            </Form.Group>


            <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default RegisterForm;