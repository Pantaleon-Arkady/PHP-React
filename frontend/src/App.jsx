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
                        <div className="h-50 border">

                        </div>
                        <div className="h-50 border">

                        </div>
                    </div>
                    <div className="col-md-5 border">
                        <form></form>
                        <div>
                            Please 
                        </div>
                    </div>
                </Container>
            }
        </>
    )
}

export default App;
