import { useState, useContext, useEffect } from 'react';
import './Login.css';
import { googleAuthProvider, auth } from '../firebaseConfig';
import { signInWithPopup } from "firebase/auth";
import Header from '../header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { getDatabase, ref, set, onValue } from "firebase/database";

function Login() {

    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userType, setUserType] = useState('');

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const user = result.user;
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
    
            // Check if user data already exists and is setup complete
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.isSetupComplete) {
                    // User data exists and setup is complete, so just log the user in
                    setIsLoggedIn(true);
                    navigate('/');
                } else {
                    // User data does not exist, so set the user data
                    set(userRef, {
                        userType: userType,
                        // Set any other user info you need to initialize
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
                        // If userData does not exist or isSetupComplete is not true
                        navigate('/makeUser');
                    }
                }, {
                    onlyOnce: true
                });
            }
        });
        return () => unsubscribe();
    }, [setIsLoggedIn, navigate]);
    
    
      


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
                                <h2>Log In</h2>
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
                                    <h1>Offentlig bruker</h1>
                                    <p>Uforsk eller lag offentlig oppdrag rundt hele Norge.</p>
                                </button>
                                <button className="box family" onClick={() => {setShowContents(true); setUserType('Familie')}}>
                                    <h1>Familie bruker</h1>
                                    <p>Uforsk eller lag ulike familie oppdrag.</p>
                                </button>
                            </div>
                        )}
                            {showContents && (
                                <div className="contents">
                                    <div className="arrow-left" onClick={() => setShowContents(false)}>Tilbake</div>
                                    <form>
                                        <h1>Registrer <span>{userType}</span> bruker</h1>
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
            </div>

    
    );
}

export default Login;