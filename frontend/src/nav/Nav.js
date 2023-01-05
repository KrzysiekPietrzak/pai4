import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Nav({setIsLogged}) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setIsLogged(false);
        navigate('/');
    }
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <span className="home"><Link to="/">Strona główna</Link></span>
                    <span className="header">Społeczność fanów "Gry o Tron"</span>
                    <button onClick={() => logout()}>Wyloguj się</button>
                </div>
            </nav>
        </div>
    );
}

export default Nav;