import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
                {/* <Route path="/search/*" element={<SearchPage />} /> */}
                <Route path="/search/:query" element={<SearchPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
