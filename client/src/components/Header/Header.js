import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    function handleLogout () {
        sessionStorage.removeItem('userId');
        alert("logged out!")
        navigate('/home')
    }

    return (
        <header>
            HearHere
            <nav>
                <Link to='/home'>Home</Link>
                {/* <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link> */}
                {window.sessionStorage.getItem("userId") ? "" : <Link to='/login'>Log In</Link>}
                {window.sessionStorage.getItem("userId") ? "" : <Link to='/signup'>Sign Up</Link>}
                {window.sessionStorage.getItem("userId") ? <Link to='/account'>Account</Link> : ""}
                {window.sessionStorage.getItem("userId") ? <Link to='' onClick={handleLogout}>Log Out</Link> : ""}
            </nav>
        </header>
    )
}

export default Header;