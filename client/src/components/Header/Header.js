import './Header.scss';
import logo from '../../assets/icons/HearHere-white.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Search from '../Search/Search';

function Header() {
    const navigate = useNavigate();

    function handleLogout () {
        sessionStorage.removeItem('userId');
        alert("logged out!")
        navigate('/home')
    }

    return (
        <header>
            <Link to='/home'><img className='header__logo' src={logo} alt="HearHere Logo" /></Link>
            <Search />
            <nav>
                <Link to='/home'>Home</Link>
                {window.sessionStorage.getItem("userId") ? "" : <Link to='/login'>Log In</Link>}
                {window.sessionStorage.getItem("userId") ? "" : <Link to='/signup'>Sign Up</Link>}
                {window.sessionStorage.getItem("userId") ? <Link to='/account'>Account</Link> : ""}
                {window.sessionStorage.getItem("userId") ? <Link to='' onClick={handleLogout}>Log Out</Link> : ""}
            </nav>
        </header>
    )
}

export default Header;