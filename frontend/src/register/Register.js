import React from 'react';
import { useNavigate, Link } from "react-router-dom";

function Register(props) {
    const navigate = useNavigate();

    const Register_ = (e) => {
        e.preventDefault();
        if(e.target.login.value && e.target.password.value == e.target.repassword.value) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: e.target.login.value, password: e.target.password.value})
            };
            fetch('http://localhost:5000/users', requestOptions)
                .then(response => response.json())
                .then(data => {console.log(data)
                    if(data.msg === "Taken") {
                        alert("Login jest już zajęty!");
                    } else {
                        alert("Zostałeś poprawnie zarejestrowany!");
                        navigate("/");
                    }
                });
            
        } else {
            alert("W formularzu występuje błąd!");
        }
    }
    return (
        <div className="register-wrapper">
            <div className="container">
                <div className="register-panel">
                    <h4>Panel rejestracji</h4>
                    <form onSubmit={e => Register_(e)}>
                        <div>
                            <label htmlFor="login">Login:</label>
                            <input type="text" name="login" id="login"/>
                        </div>
                        <div>
                            <label htmlFor="password">Hasło:</label>
                            <input type="password" name="password" id="password"/>
                        </div>
                        <div>
                            <label className="repass" htmlFor="repassword">Powtórz hasło:</label>
                            <input type="password" name="repassword" id="repassword"/>
                        </div>
                        <input type="submit" value="Zarejestruj się"/>
                    </form>
                    <div className="info">
                        <div className="clear"></div>
                        <span>Masz już konto? <b><Link to="/">Zaloguj się!</Link></b></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;