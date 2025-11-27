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

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(user))
    }, [user]);

    const handleSetUser = (newUserData) => {
        setUser(newUserData);
    };

    useEffect(() => {
        const handleScreenSize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleScreenSize);
        return () => window.removeEventListener("resize", handleScreenSize);
    }, [])

    const showLogIn = () => {
        setIsRegister(false);
    };

    const showRegister = () => {
        setIsRegister(true);
    };

    const handleRegisterSuccess = () => {
        setRegisterSuccess(true);
        setTimeout(() => setRegisterSuccess(false), 4000);
    };

    return (
        <div className="auth_page_container w-100 d-flex flex-column">
            <div className="auth_body border d-flex flex-row">
                <div className="auth_left border">
                    <div className="left_poster w-75 p-5 rounded">
                        Desktop Content Poster
                    </div>
                </div>
                <div className="auth_right border">
                    <div className="mobile_heading">
                        Mobile Heading as content poster
                    </div>
                    <div className="auth_form_wrapper p-4 rounded">
                        {isRegister ?
                            <RegisterForm />
                            :
                            <LogInForm 
                                userData={handleSetUser}
                            />
                        }
                        <div className="auth_form_toggle">
                            Please <a onClick={showLogIn}>Log in</a> to continue. or <a onClick={showRegister}>Register?</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth_footer border">
                footer
            </div>
        </div>
    )
}

export default AuthPage;
