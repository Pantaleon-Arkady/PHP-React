import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./forms/register.jsx";

function App() {
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
                <Container fluid>
                    Mobile
                </Container>
                :
                <Container fluid className="row p-5 min-vh-100">
                    <div className="col-md-7 d-flex flex-column border">
                        <div className="h-25 border d-flex justify-content-end align-items-end">
                            <h2 className="border">App Name</h2>
                        </div>
                        <div className="h-75 border d-flex justify-content-end">
                            <div className="w-75 h-75 border">
                                Poster Card - with info
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 border d-flex align-items-center">
                        <div className="border h-75 w-75">
                            { isRegister ? 
                                <RegisterForm />
                                : 
                                <div>Log in</div>
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

export default App;
