import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
        const handleScreenSize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleScreenSize);
        return () => window.removeEventListener("resize", handleScreenSize);
    }, [])

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
                            <form className="border w-100 h-75">

                            </form>
                            <div>
                                Please 
                            </div>
                        </div>
                    </div>
                </Container>
            }
        </>
    )
}

export default App;
