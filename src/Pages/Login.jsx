import { useState, useContext, useEffect, useRef } from 'react';
import './Login.css';
import { googleAuthProvider, auth } from '../firebaseConfig';
import { signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
    const [justRegistered, setJustRegistered] = useState(false);

    
    const [email, setEmail] = useState('');

    // New function to create a temporary account
    const createTemporaryAccountAndSendSignInLink = async (email) => {
        const temporaryPassword = "someRandomP@ssw0rd"; // Generate a secure, random password
        try {
            // Create a temporary account with the email and a placeholder password
            await createUserWithEmailAndPassword(auth, email, temporaryPassword);
            // Then, send the sign-in link to the email
            const actionCodeSettings = {
                url: 'http://localhost:3000/makeUser',
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
        } catch (error) {
            console.error("Error creating account or sending sign-in link: ", error);
            alert(error.message);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (email) {
            const actionCodeSettings = {
                // URL you want to redirect back to. The domain for this URL must be in the Firebase Console list of authorized domains.
                url: 'http://localhost:3000/makeUser', // Adjust as per your deployment
                handleCodeInApp: true, // Ensures that we can handle the sign-in after email verification in-app
            };
    
            sendSignInLinkToEmail(auth, email, actionCodeSettings)
                .then(() => {
                    // Inform the user to check their email
                    window.localStorage.setItem('emailForSignIn', email); // Save the email locally to use it later for sign-in
                    alert("Check your email for the sign-in link.");
                    setJustRegistered(true); // Optionally flag that registration has initiated
                })
                .catch((error) => {
                    console.error("Error sending sign-in link to email:", error);
                    alert(error.message);
                });
        } else {
            alert('Please enter a valid email address.');
        }
    };
    
    

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
    
            // First, check if the user already exists
            onValue(userRef, async (snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                    // User exists, proceed with login
                    if (userData.isSetupComplete) {
                        setIsLoggedIn(true);
                        navigate('/');
                    } else {
                        alert('Du er ikke registrert. Registrer deg først ;)');
                        await auth.signOut();
                    }
                } else {
                    // New user, proceed with registration
                    if (activeSection === 'register') {
                        set(userRef, {
                            email: user.email,
                            userType: userType,
                            // other user data...
                            isSetupComplete: true, // Ensure this is set correctly during registration
                        });
                        setIsLoggedIn(true);
                        navigate('/');
                    } else {
                        alert('Please register before logging in.');
                        await auth.signOut();
                    }
                }
            }, {
                onlyOnce: true
            });
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };
    
    // Function to handle the sign-in process after the user clicks on the link
    const handleSignInWithEmailLink = async (email) => {
        try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            const user = result.user;
            // Update or set user data in the database
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
            onValue(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    // User exists, update as necessary
                    console.log("User already exists in the database.");
                } else {
                    // New user, set initial data
                    set(userRef, {
                        email: user.email,
                        userType: 'DefaultType', // Modify as necessary
                        isSetupComplete: false, // Set to false until the user completes their profile
                    });
                }
            }, {
                onlyOnce: true
            });
            setIsLoggedIn(true);
            navigate('/makeUser'); // Redirect to account setup or profile page
        } catch (error) {
            console.error("Error signing in with email link: ", error);
            // Handle errors, such as showing an alert to the user
        }
    };

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href) && !justRegistered) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (email) {
                handleSignInWithEmailLink(email).catch(console.error);
            } else {
                // Optionally, prompt for email or handle the case differently
            }
        }
        // Reset justRegistered at a point where it's safe to assume the user is not directly navigating post-registration
    }, [auth, justRegistered]);
    
    
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
                                    <input type="tel" placeholder="Email" required="" />
                                    <button type="submit">Logg Inn</button>
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
                                    <form onSubmit={handleRegisterSubmit}>
                                        <h1>Registrer <span>{userType}</span> bruker</h1>
                                            <label htmlFor="phoneNumberInput" className="form-label">Skriv inn</label>
                                             <input type="email" className="form-control" id="phoneNumberInput" aria-describedby="emailHelp" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                             <button type="submit">Registrer</button>
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