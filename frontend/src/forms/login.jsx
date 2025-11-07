import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { logInAccount } from "../service/UserService";
import { useNavigate } from "react-router-dom";

function LogInForm({ onCreate }) {
    const [namemail, setNameMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!namemail.trim() && !password.trim()) return;

        try {

            const result = await logInAccount({
                namemail, password
            });
            console.log("POST /user-log-in result:", result);

        } catch (error) {
            console.error(error);
        }

        setNameMail("");
        setPassword("");

        navigate("/homepage");
    };

    return (
        <Form onSubmit={handleSubmit} className="w-100">
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter your username or email here..."
                    value={namemail}
                    onChange={(e) => setNameMail(e.target.value)}
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

            <div className="d-flex justify-content-center mt-3">
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </div>
        </Form>
    )
}

export default LogInForm;