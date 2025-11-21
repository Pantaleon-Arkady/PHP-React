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
        // <>
        //     {isMobile ?
        //         <Container className="mobile_auth_parent p-0 d-flex flex-column">
        //             <div className="mobile_auth_head border px-3 py-2">
        //                 <h3 className="">App Name</h3>
        //             </div>

        //             <div 
        //                 className="mobile_auth_body border d-flex justify-content-center align-items-center"
        //             >
        //                 <div className="mobile_auth_main border d-flex flex-column justify-content-" >
        //                     {isRegister ? (
        //                         <RegisterForm onRegister={handleRegisterSuccess} />
        //                     ) : (
        //                         <LogInForm userData={handleSetUser} />
        //                     )}

        //                     {registerSuccess && (
        //                         <div className="">
        //                             <strong>Success!</strong> You have registered.
        //                         </div>
        //                     )}

        //                     <div className="border">
        //                         Please{" "}
        //                         <a className="" onClick={toggleForm}>
        //                             Log in
        //                         </a>{" "}
        //                         to continue. or{" "}
        //                         <a className="" onClick={toggleForm}>
        //                             Register?
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </Container>
        //         :
        //         <Container fluid className="row p-5 min-vh-100">
        //             <div className="col-md-7 d-flex flex-column border">
        //                 <div className="h-25 border d-flex justify-content-end align-items-end app_name_div">
        //                     <h1 className="sign_app_name px-3">App Name</h1>
        //                 </div>
        //                 <div className="h-75 border d-flex justify-content-end">
        //                     <div className="w-75 h-75 border">
        //                         Poster Card - with info
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-md-5 border d-flex align-items-center">
        //                 <div className="border form_wrapper">
        //                     {isRegister ?
        //                         <RegisterForm
        //                             onRegister={handleRegisterSuccess}
        //                         />
        //                         :
        //                         <LogInForm
        //                             userData={handleSetUser}
        //                         />
        //                     }
        //                     {
        //                         registerSuccess &&
        //                         <div className="alert alert-success">
        //                             <strong>Success!</strong> You have registered
        //                         </div>
        //                     }
        //                     <div>
        //                         Please <a onClick={toggleForm}>Log in</a> to continue. or <a onClick={toggleForm}>Register?</a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </Container>
        //     }
        // </>
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
