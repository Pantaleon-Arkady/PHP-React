import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

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
                <Container fluid>
                    Desktop
                </Container>
            }
        </>
    )
}

export default App;
