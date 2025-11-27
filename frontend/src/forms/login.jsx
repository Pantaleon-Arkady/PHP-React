import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { logInAccount } from "../service/UserService";
import { useNavigate } from "react-router-dom";

function LogInForm({ userData }) {
    const [namemail, setNameMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    function validateForm() {
        const newErrors = {};

        if (!namemail.trim()) {
            newErrors.namemail = "This field is required.";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required.";
        }

        return newErrors;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setServerError("");

        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {

            const result = await logInAccount({
                namemail, password
            });
            console.log("POST /user-log-in result:", result);

            if (result.success && result.data.login) {
                const loggedUser = {
                    id: result.data.user.id,
                    username: result.data.user.username,
                    role: result.data.user.role,
                    email: result.data.user.email
                };

                userData(loggedUser);

                setNameMail("");
                setPassword("");

                navigate("/homepage");
            } else {
                let message = "Login failed. Please try again.";

                if (result.data?.namemail) {
                    message = "Wrong password.";
                } else if (result.data?.password) {
                    message = "Username or email not found.";
                }

                setServerError(message);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className=""
        >
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter your username or email..."
                    value={namemail}
                    onChange={(e) => setNameMail(e.target.value)}
                    className="form-control-custom"
                    isInvalid={!!errors.namemail}
                />
                {errors.namemail && <div className="text-light bg-danger rounded py-1 px-3 mt-1">{errors.namemail}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-custom"
                    isInvalid={!!errors.password}
                />
                {errors.password && <div className="text-light bg-danger rounded py-1 px-3 mt-1">{errors.password}</div>}
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
                <Button type="submit" className="">
                    Log In
                </Button>
            </div>

            {serverError && (
                <div className="text-light bg-danger rounded py-1 px-3 mt-1">
                    {serverError}
                </div>
            )}
        </Form>
    )
}

export default LogInForm;