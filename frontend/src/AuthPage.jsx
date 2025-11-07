import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./forms/register.jsx";
import LogInForm from "./forms/login.jsx";

function AuthPage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        const handleScreenSize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleScreenSize);
        return () => window.removeEventListener("resize", handleScreenSize);
    }, [])

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    return (
        <>
            {isMobile ?
                <Container fluid className="landing_container_mobile px-0 mx-0">
                    <div className="app_name_div">
                        <h3 className="p-2 sign_app_name">App Name</h3>
                    </div>
                    <div className="border mobile_form_wrapper px-3 pt-5 pb-3">
                        {isRegister ?
                            <RegisterForm />
                            :
                            <LogInForm />
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
                                <RegisterForm />
                                :
                                <LogInForm />
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
