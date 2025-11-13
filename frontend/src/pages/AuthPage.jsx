import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import RegisterForm from "../forms/register.jsx";
import LogInForm from "../forms/login.jsx";

function AuthPage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [isRegister, setIsRegister] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    const guestUser = {
        id: 2003,
        username: "guest user",
        role: "user",
        email: "gues.user@email.com"
    }

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : guestUser;
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user]);

    const handleSetUser = (newUserData) => {
        setUser(newUserData);
    };

    useEffect(() => {
        const handleScreenSize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleScreenSize);
        return () => window.removeEventListener("resize", handleScreenSize);
    }, [])

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    const handleRegisterSuccess = () => {
        setRegisterSuccess(true);
        setTimeout(() => setRegisterSuccess(false), 4000);
    };

    return (
        <>
            {isMobile ?
                <Container fluid className="landing_container_mobile px-0 mx-0">
                    <div className="app_name_div p-2">
                        <h3 className="p-2 sign_app_name">App Name</h3>
                    </div>
                    <div className="border mobile_form_wrapper px-3 pt-5 pb-3 w-100 mt-0">
                        {isRegister ?
                            <RegisterForm
                                onRegister={handleRegisterSuccess}
                            />
                            :
                            <LogInForm 
                                userData={handleSetUser}
                            />
                        }
                        {
                            registerSuccess &&
                            <div className="alert alert-success">
                                <strong>Success!</strong> You have registered
                            </div>
                        }
                        <div>
                            Please <a onClick={toggleForm}>Log in</a> to continue. or <a onClick={toggleForm}>Register?</a>
                        </div>
                    </div>
                </Container>
                :
                <Container fluid className="row p-5 min-vh-100">
                    <div className="col-md-7 d-flex flex-column border">
                        <div className="h-25 border d-flex justify-content-end align-items-end app_name_div">
                            <h1 className="sign_app_name px-3">App Name</h1>
                        </div>
                        <div className="h-75 border d-flex justify-content-end">
                            <div className="w-75 h-75 border">
                                Poster Card - with info
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 border d-flex align-items-center">
                        <div className="border form_wrapper">
                            {isRegister ?
                                <RegisterForm
                                    onRegister={handleRegisterSuccess}
                                />
                                :
                                <LogInForm 
                                    userData={handleSetUser}
                                />
                            }
                            {
                                registerSuccess &&
                                <div className="alert alert-success">
                                    <strong>Success!</strong> You have registered
                                </div>
                            }
                            <div>
                                Please <a onClick={toggleForm}>Log in</a> to continue. or <a onClick={toggleForm}>Register?</a>
                            </div>
                        </div>
                    </div>
                </Container>
            }
        </>
    )
}

export default AuthPage;
