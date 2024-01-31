import { Link } from "react-router-dom";

function Header () {
    return (
        <header>
            HearHere
            <nav>
                <Link to='/home'>Home</Link>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/account'>Account</Link>
            </nav>
        </header>
    )
}

export default Header;