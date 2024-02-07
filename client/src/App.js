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
import Player from "./components/Player/Player";
import { useEffect, useState } from "react";

function App() {
    const [song, setSong] = useState("")
    useEffect(() => console.log(), [song]);

    return (
        <BrowserRouter>
            <Header songPicker={setSong} />
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path="/home" element={<HomePage songPicker={setSong} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
                <Route path="/search/:query" element={<SearchPage />} />
            </Routes>
            <Player songId={song}/>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
