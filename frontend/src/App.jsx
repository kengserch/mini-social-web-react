import Home from "./pages/Home";
import Header from "./components/header";
import {Routes, Route,Navigate } from "react-router";
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate replace to="/webboards" />} />
                <Route path="/webboards" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
