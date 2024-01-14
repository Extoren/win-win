import React from 'react';
import './Login.css';

function Login() {
    return (

        <div className="container">
            <div className="header">
                <div className="logo">
                <a href="../index.html">
                    <img src="../Bilder/Logo_CC.png" alt="logo" id="logo" />
                </a>
                <p>Winstinct!</p>
                </div>
                <div className="header-menu-container">
                <div className="header-menu">
                    <a href="../index.html" className="active">
                    Finn Jobb
                    </a>
                    <a href="../Templates/FAQ.html">FAQ</a>
                </div>
                </div>
                <div className="user-settings">
                <div className="dark-light">
                    <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                </div>
                <div className="user-menu">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-square"
                    >
                    <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                    <image
                        xlinkHref="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg"
                        x={6}
                        y={6}
                        width={12}
                        height={12}
                    />
                    </svg>
                    <div className="dropdown-menu">
                    <a href="#" className="selected-location">
                        Norsk
                    </a>
                    <a href="#">English</a>
                    </div>
                </div>
                <a href="#">
                    <div className="user-name">Logg Inn</div>
                </a>
                </div>
            </div>
            <div className="wrapper">
                <div className="form-container">
                <div className="form-wrapper">
                    <div className="form-menu">
                    <div id="active-bg" className="active-bg" />
                    <span
                        id="login"
                        className="active"
                        onclick="showLoginForm(); toggleActive('login');"
                    >
                        Login
                    </span>
                    <span
                        id="register"
                        onclick="showRegisterForm(); toggleActive('register');"
                    >
                        Registrer
                    </span>
                    </div>
                    <div className="form-section login">
                    <h2>Logg Inn</h2>
                    <form>
                        <input type="email" placeholder="Email" required="" />
                        <input type="password" placeholder="Passord" required="" />
                        <a href="#" id="glømt">
                        Glømt passordet?
                        </a>
                        <button type="submit">Logg Inn</button>
                    </form>
                    </div>
                    <div className="form-section register" style={{ display: "none" }}>
                    <div className="choose">
                        <div className="arrow-left">Tilbake</div>
                        <button className="box official">
                        <h1>Offentlig bruker</h1>
                        <p>Uforsk eller lag offentlig oppdrag rundt hele Norge.</p>
                        </button>
                        <button className="box family">
                        <h1>Familie bruker</h1>
                        <p>Uforsk eller lag ulike familie oppdrag.</p>
                        </button>
                    </div>
                    <div className="contents">
                        <h2>Registrer</h2>
                        <form id="registerForm">
                        <input type="text" placeholder="Navn" required="" />
                        <input type="text" placeholder="Etternavn" required="" />
                        <input type="email" placeholder="Email" required="" />
                        <input type="password" placeholder="Passord" required="" />
                        <input
                            type="password"
                            placeholder="Bekreft Passord"
                            required=""
                        />
                        <input type="date" placeholder="Fødselsdato" required="" />
                        <input type="text" placeholder="Addresse" required="" />
                        <div className="radio-container">
                            <div className="radio-wrapper">
                            <input type="radio" id="option1" name="options" required="" />
                            <label htmlFor="option1">Barn</label>
                            </div>
                            <div className="radio-wrapper">
                            <input type="radio" id="option2" name="options" required="" />
                            <label htmlFor="option2">Voksen</label>
                            </div>
                        </div>
                        <div className="checkbox-wrapper">
                            <input type="checkbox" id="checkmark1" name="checkmark1" />
                            <label htmlFor="checkmark1">
                            Jeg godtar vilkårene og personvernerklæringen.
                            </label>
                        </div>
                        <div className="checkbox-wrapper">
                            <input type="checkbox" id="checkmark2" name="checkmark2" />
                            <label htmlFor="checkmark2">
                            Jeg ønsker nyheter og rapporter sendt til min email.
                            </label>
                        </div>
                        <button type="submit" id="submitButton">
                            Registrer
                        </button>
                        </form>
                    </div>
                    </div>
                    <div className="form-section info" style={{ display: "none" }}>
                    <h1>Informasjon</h1>
                    <h3>Offentlig bruker</h3>
                    <p>
                        Med en Offentlig bruker kan du lage eller gjøre offentlige oppdrag
                        laget av voksne brukere.
                    </p>
                    <br />
                    <h3>Familie bruker</h3>
                    <p>
                        Med en Familie bruker kan du lage eller gjøre familie oppdrag laget
                        av foresatte.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>

    
    );
}

export default Login;