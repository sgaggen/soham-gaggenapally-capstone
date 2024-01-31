import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

export default App;
