import React, { useState, useEffect, useContext } from 'react';
import './profile.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import { AuthContext } from '../AuthContext';
import { auth, database } from '../firebaseConfig';
import { ref, get } from "firebase/database";
import { useParams } from 'react-router-dom'; 

function Profile() {
    const { isLoggedIn } = useContext(AuthContext);
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });
    const [userData, setUserData] = useState({}); // state to store user data
    const { userId } = useParams(); // useParams hook to get userId from URL

    useEffect(() => {
        if (isLoggedIn) {
            const userId = auth.currentUser.uid;
            const dbRef = ref(database, 'users/' + userId);

            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUserName({ firstName: userData.name, lastName: userData.surname });
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (userId) { // Check if the userId is available
            const userRef = ref(database, 'users/' + userId);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setUserData(snapshot.val()); // Set the entire user data in state
                } else {
                    console.log("No data available for user: " + userId);
                }
            }).catch((error) => {
                console.error("Error fetching data: ", error);
            });
        }
    }, [userId]); // Only re-run the effect if the userId changes

    return (
        <div className="container">
            <Header />

                <div className="innerwrap">
                    <section className="section1 clearfix">
                    <div>
                        <div className="row grid clearfix">
                        <div className="col2 first">
                            <div className="profile-picture">
                                <i className="fas fa-user"></i>
                            </div>
                            <h2>{`${userData.name || ''} ${userData.surname || ''}`}</h2>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's
                            </p>
                            <span>Verifisert</span>
                        </div>
                        <div className="col2 last">
                            <div className="grid clearfix">
                            <div className="col3 first">
                                <h1>0</h1>
                                <span>Utført</span>
                            </div>
                            <div className="col3">
                                <h1>0</h1>
                                <span>Favoritter</span>
                            </div>
                            <div className="col3 last">
                                <h1>0</h1>
                                <span>Prestasjoner</span>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row clearfix">
                        <ul className="row2tab clearfix">
                            <li>
                            <i className="fa fa-list-alt" /> Jobber{" "}
                            </li>
                            <li>
                            <i className="fa fa-heart" /> Favoritter{" "}
                            </li>
                            <li>
                            <i className="fa fa-comment" /> Anmeldelser{" "}
                            </li>
                            <li>
                            <i className="fa fa-trophy " /> Prestasjoner{" "}
                            </li>
                        </ul>
                        </div>
                    </div>
                    <span className="smalltri">
                        <i className="fa fa-check" />
                    </span>
                    </section>
                    <section className="section2 clearfix">
                    <div className="grid">
                        <div className="col3 first">
                        <div className="postcont">
                            <img
                            src="#"
                            alt=""
                            />
                        </div>
                        <div className="profileinfo">
                            <div className="profile-picture">
                                <i className="fas fa-user"></i>
                            </div>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy tex
                            </p>
                            <span>
                            Les mer <i className="fa fa-angle-right" />
                            </span>
                        </div>
                        </div>
                        <div className="col3 center">
                        <div className="postcont">
                            <img
                            src="http://www.grazia.fr/var/grazia/storage/images/media/images/mode/2016-01-29-david-beckham-devoile-sa/david-beckham-pour-h-m-2/13241802-1-fre-FR/David-Beckham-pour-H-M-2_w300.jpg"
                            alt=""
                            />
                        </div>
                        <div className="profileinfo">
                            <div className="profile-picture">
                                <i className="fas fa-user"></i>
                            </div>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy tex
                            </p>
                            <span>
                            Les mer <i className="fa fa-angle-right" />
                            </span>
                        </div>
                        </div>
                        <div className="col3 last">
                        <div className="postcont">
                            <img
                            src="http://img.timeinc.net/people/i/2006/startracks/060814/david_beckham.jpg"
                            alt=""
                            />
                        </div>
                        <div className="profileinfo">
                            <div className="profile-picture">
                                <i className="fas fa-user"></i>
                            </div>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy tex
                            </p>
                            <span>
                            Les mer <i className="fa fa-angle-right" />
                            </span>
                        </div>
                        </div>
                    </div>
                    </section>
                    <div className="profile-saves-container">
                    <div className="profile-saves">
                        <h3>Åpen CV og søknad</h3>
                        <div className="open-files">
                            <div className="cv">
                                <p>CV <span>PDF   .docx</span></p>
                                <input type="file" id="myFile" name="filename"></input>
                                <button type="submit">Lagre</button>
                            </div>
                            <div className="søknad">
                                <p>Søknad <span>PDF   .docx</span></p>
                                <input type="file" id="myFile" name="filename"></input>
                                <button type="submit">Lagre</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>


            <NavigationBar />
        </div>
    );
}

export default Profile;
