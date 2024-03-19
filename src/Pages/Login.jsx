import { useState, useContext, useEffect, useRef } from 'react';
import './Login.css';
import { googleAuthProvider, auth } from '../firebaseConfig';
import { signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import Header from '../header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { getDatabase, ref, set, onValue } from "firebase/database";
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';

function Login() {

    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');
      // State to track the active form section
    const [activeSection, setActiveSection] = useState('login');
    const [showContents, setShowContents] = useState(false);
    const activeSectionRef = useRef(activeSection);
    activeSectionRef.current = activeSection;
    
    const [email, setEmail] = useState('');

    // Call this function when the user submits their email
    const sendSignInLink = async (e) => {
        e.preventDefault();
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'http://localhost:3000/makeUser', // This is where the user will be redirected after clicking the link
            handleCodeInApp: true,
            // Add any additional settings if necessary
        };
    
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            // Save the email locally so you don't need to ask the user for it again
            // if they click on the link in the same device
            window.localStorage.setItem('emailForSignIn', email);
            alert('Link sent! Check your email for the sign-in link.');
        } catch (error) {
            console.error("Error sending sign-in link: ", error);
            alert(error.message);
        }
    };
    

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
    
            // After a user signs in, their email can be accessed through user.email
            const userEmail = user.email;
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
            
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.isSetupComplete) {
                    setIsLoggedIn(true);
                    navigate('/');
                } else {
                    // User data does not exist or setup is not complete,
                    // so set or update the user data with the email
                    set(userRef, {
                        email: userEmail, // Save the email
                        userType: userType,
                        // ...any other user info you need to initialize
                        isSetupComplete: false,
                    }).then(() => {
                        navigate('/makeUser');
                    }).catch((error) => {
                        console.error("Error setting user data: ", error);
                    });
                }
            }, {
                onlyOnce: true
            });
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };
    
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, 'users/' + user.uid);
                onValue(userRef, (snapshot) => {
                    const userData = snapshot.val();
                    // Check if userData exists and the isSetupComplete flag is true
                    if (userData && userData.isSetupComplete) {
                        setIsLoggedIn(true);
                        navigate('/');
                    } else {
                        // Now we check the ref's current value to decide
                        if (activeSectionRef.current === 'register') {
                            navigate('/makeUser');
                        } else {
                            // If not in register section, do not redirect
                            // Optionally, handle this case, e.g., show an error or log out the user
                            console.log('User data incomplete or missing, and not in the register section.');
                        }
                    }
                }, {
                    onlyOnce: true
                });
            }
        });
        return () => unsubscribe();
    }, [setIsLoggedIn, navigate]); // Removed activeSection from dependencies to avoid re-running the effect unnecessarily
    
    useEffect(() => {
        // Confirm the link is a sign-in with email link.
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                    setIsLoggedIn(true);
                    navigate('/makeUser'); // Redirect to makeUser after successful sign-in
                })
                .catch((error) => {
                    console.error("Error signing in with email link: ", error);
                });
        }
    }, [auth, navigate, setIsLoggedIn]);    
    

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
            <div className="wrapper2">
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
                                <h2>Log In</h2>
                                <form>
                                    <input disabled id="not" type="tel" placeholder="Email" required="" />
                                    <button disabled id="not" type="submit">Logg Inn</button>
                                </form>

                                <h3>eller</h3>

                                <div className='email-container'>
                                    <button onClick={(e) => signInWithGoogle(e)} className="app-link-button3 app-google-sign-in-button">
                                        <img src="google.png" alt="Google logo" />
                                        Google
                                    </button>
                                </div>
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
                                    <form onSubmit={sendSignInLink}>
                                        <h1>Registrer <span>{userType}</span> bruker</h1>
                                            <label htmlFor="phoneNumberInput" className="form-label">Skriv inn</label>
                                            <input disabled id="not" type="email" className="form-control" aria-describedby="emailHelp" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            <button disabled id="not" type="submit">Registrer</button>
                                        <h3>eller</h3>
                                        <div className='email-container'>
                                            <button onClick={(e) => signInWithGoogle(e)} className="app-link-button3 app-google-sign-in-button">
                                                <img src="google.png" alt="Google logo" />
                                                Google
                                            </button>
                                        </div>
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
            <NavigationBar />
            <Footer />  
        </div>

    
    );
}

export default Login;