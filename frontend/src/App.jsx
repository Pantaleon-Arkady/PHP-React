import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthPage from "./pages/AuthPage";
import Homepage from "./pages/Homepage";
import ProfilePage from "./pages/ProfilePage";

function LandingPage() {
    
    return (
        <Container fluid>
            <div>
                <span>Landing Page...</span>
            </div>
            <div className="col-lg">
                <div className="">
                    <Link to="/signup" className="btn btn-primary m-2">Log in?</Link>
                </div>
            </div>
        </Container>
    )
};

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/profilepage/:userId" element={<ProfilePage />} />
            </Routes>
        </Router>
    )
}

export default App;