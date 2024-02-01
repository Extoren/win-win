import { useState, useContext, useEffect } from 'react';
import './Login.css';
import { auth, database } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Header from '../header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

import { ref, set } from "firebase/database";


function Login() {

    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    const contryCode = '+47';
    const [phoneNumber, setPhoneNumber] = useState(contryCode);
    const [expandForm, setExpandForm] = useState(false);
    const [OTP, setOTP] = useState('');

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        navigate('/makeUser');
    };

    const generateRecaptcha = () => {
        if (!window.recaptchaVerifier && auth) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            }, auth);
        }
        window.recaptchaVerifier.render().catch((error) => {
            console.error('Recaptcha render error:', error);
        });
    }

    const requestOTP = (e) => {
        e.preventDefault();
        console.log("Requesting OTP for Phone Number:", phoneNumber);

        if (phoneNumber.length >= 8) {
            setExpandForm(true);
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                }).catch((error) => {
                    console.error("Error during signInWithPhoneNumber:", error);
                });
        } else {
            console.log("Invalid phone number length");
        }
    }

    const confirmOTP = (e) => {
        e.preventDefault();
        console.log("Confirming OTP:", OTP);

        if (window.confirmationResult) {
        window.confirmationResult.confirm(OTP).then((result) => {
            // User signed in successfully.
            console.log("User signed in successfully.");
            const user = result.user;

            // Update user type in Firebase Database
            updateDatabaseWithUserType(user.uid, userType);

            handleLoginSuccess();
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.error("Error during OTP confirmation:", error);
        });
        } else {
        console.log("No confirmation result available.");
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            setIsLoggedIn(true);
          } else {
            // No user is signed in.
            setIsLoggedIn(false);
          }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, [setIsLoggedIn]);

    const updateDatabaseWithUserType = (userId, type) => {
    if (!userId || !type) {
        console.error('Invalid user ID or type for database update.');
        return;
    }
    
    const dbRef = ref(database, 'users/' + userId);
    console.log('Attempting to update database with user type:', type);
    
    set(dbRef, { userType: type })
        .then(() => {
        console.log('Database updated successfully!');
        })
        .catch((error) => {
        console.error('Error updating database:', error);
        });
    };
      


    // State to track the active form section
    const [activeSection, setActiveSection] = useState('login');
    const [showContents, setShowContents] = useState(false);

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
                                <input type="tel" placeholder="Email" required="" />
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
                        {!showContents && (
                            <div className="choose">
                                <button className="box official" onClick={() => {setShowContents(true); setUserType('Offentlig')}}>
                                    <h1 id="official">Offentlig bruker</h1>
                                    <p>Uforsk eller lag offentlig oppdrag rundt hele Norge.</p>
                                </button>
                                <button className="box family" onClick={() => {setShowContents(true); setUserType('Familie')}}>
                                    <h1 id="official">Familie bruker</h1>
                                    <p>Uforsk eller lag ulike familie oppdrag.</p>
                                </button>
                            </div>
                        )}
                            {showContents && (
                                <div className="contents">
                                    <div className="arrow-left" onClick={() => setShowContents(false)}>Tilbake</div>
                                    <form onSubmit={requestOTP}>
                                        <h1>Registrer <span>{userType}</span> bruker</h1>
                                        <div>
                                            <label htmlFor="phoneNumberInput" className="form-label">Telefonnummer</label>
                                            <input type="tel" className="form-control" id="phoneNumberInput" aria-describedby="emailHelp" value={phoneNumber} onChange={(e) => {
                                                    // Only update the phone number part, keeping the country code unchanged
                                                    const newNumber = contryCode + e.target.value.slice(contryCode.length);
                                                    setPhoneNumber(newNumber);

                                                    // Extract the part of the input that's not the country code
                                                    const inputNumber = e.target.value.slice(contryCode.length).trim();

                                                    // Update phoneNumber with the country code, a space, and then the input number
                                                    setPhoneNumber(contryCode + " " + inputNumber);
                                                }}
                                            />
                                            <div id="phoneNumberHelp" className="form-text">Skriv inn telefonnummeret ditt</div>
                                            <br></br>
                                        </div>
                                    
                                        {expandForm === true?
                                            <>
                                                <div>
                                                    <label htmlFor="otpInput" className="form-label">One time pin</label>
                                                    <input type="number" className="form-control" id="otpInput" value={OTP} onChange={(e) => setOTP(e.target.value)} />
                                                    <div id="otpHelp" className="form-text">Vennligst skriv inn engangs-pin-koden som ble sendt til telefonen din</div>
                                                </div>
                                            </>
                                            : null}
                                        {
                                            expandForm === false?
                                            <button type="submit" className="btn btn-primary">Bekreft</button>
                                            :
                                            null
                                        }
                                        
                                        {
                                            expandForm === true?
                                            <>
                                                <button type="submit" className="btn btn-primary" onClick={confirmOTP}>Confirm OTP</button>
                                            </>
                                            : null
                                        }

                                        <div id="recaptcha-container"></div>
                                    </form>
                                </div>
                            )}
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