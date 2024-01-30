import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path="/home" element={<HomePage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

export default App;
