import React, { useState } from 'react';
import './Login.css';
import Header from '../header';

function Login() {

    // State to track the active form section
    const [activeSection, setActiveSection] = useState('login');

    function toggleActive(id) {
        // Set the active section state
        setActiveSection(id);

        // The rest of your existing code for moving the active-bg...
        var activeBg = document.querySelector('#active-bg');
        var newPosition = (id === 'register') ? '50%' : '0';
        activeBg.style.left = newPosition;

        var activeElement = document.querySelector('.form-menu span.active');
        if (activeElement) {
            activeElement.classList.remove('active');
        }

        var clickedElement = document.getElementById(id);
        clickedElement.classList.add('active');
    }

    return (

        <div className="container">
            <Header />
            <div className="wrapper">
                <div className="form-container">
                <div className="form-wrapper">
                    <div className="form-menu">
                    <div id="active-bg" className="active-bg" />
                    <span
                        id="login"
                        className={activeSection === 'login' ? 'active' : ''}
                        onClick={() => toggleActive('login')}
                    >
                        Login
                    </span>
                    <span
                        id="register"
                        className={activeSection === 'register' ? 'active' : ''}
                        onClick={() => toggleActive('register')}
                    >
                        Registrer
                    </span>
                    </div>
                    {activeSection === 'login' && (
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
                    )}
                    {activeSection === 'register' && (
                        <div className="form-section register">
                        <div className="choose">
                            <div className="arrow-left" style={{ display: "none" }}>Tilbake</div>
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
                                <label htmlFor="option1">Arbeidstaker</label>
                                </div>
                                <div className="radio-wrapper">
                                <input type="radio" id="option2" name="options" required="" />
                                <label htmlFor="option2">Arbeidsgiver</label>
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
                    )}
                    <div className="form-section info">
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