import React from 'react';
import { useNavigate, Link } from "react-router-dom";

function Login({setIsLogged}) {
    const navigate = useNavigate();

    const Login_ = (e) => {
        e.preventDefault();
        if(e.target.login.value && e.target.password.value) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: e.target.login.value, password: e.target.password.value})
            };
            fetch('http://localhost:5000/login', requestOptions)
                .then(response => response.json())
                .then(data => {console.log(data)
                    if(data.msg === "OK") {
                        localStorage.setItem('id', data.user_id);
                        localStorage.setItem('username', data.username);
                        setIsLogged(true);
                        navigate("/");
                    } else {
                        alert("Błąd logowania!");
                    }
                });
            
        } else {
            alert("W formularzu występuje błąd!");
        }
    }
    return (
        <div className="login-wrapper">
            <div className="container">
                <div className="login-panel">
                    <h4>Wejdź na forum i dołącz do społeczności fanów serialu "Gra o Tron"</h4>
                    <form onSubmit={(e) => Login_(e)}>
                        <div>
                            <label htmlFor="login">Login:</label>
                            <input type="text" name="login" id="login"/>
                        </div>
                        <div>
                            <label htmlFor="password">Hasło:</label>
                            <input type="password" name="password" id="password"/>
                        </div>
                        <input type="submit" value="Zaloguj się"/>
                    </form>
                    <div className="info">
                        <div className="clear"></div>
                        <span>Nie masz konta? <b><Link to="/register">Zarejestruj się!</Link></b></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;