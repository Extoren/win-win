import React, { useState, useEffect, useContext } from 'react';
import './profile.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { AuthContext } from '../AuthContext';
import { auth, database } from '../firebaseConfig';
import { ref, get } from "firebase/database";

function Profile() {
    const { isLoggedIn } = useContext(AuthContext);
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });

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

    return (
        <div className="container">
            <Header />
            <div className="profile-page">
                <div className="profile-header">
                    <div className="profile-picture">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="profile-details">
                        <div className="profile-row">
                            <h2>{`${userName.firstName} ${userName.lastName}`}</h2>
                            <button className="add-friend-btn">Verifiser</button>
                        </div>
                        <p>Velkommen til min profil! :)</p>
                        <div className="profile-stars">
                            <i className="fas fa-star"><span> ?</span></i>
                        </div>
                    </div>
                </div>
                <div className="mobile-text">
                    <p>Velkommen til min profil! :)</p>
                </div>
                <div className="profile-box">
                    <div className="profile-content">
                        <div className="about-me">
                            <h3>Om meg</h3>
                            <p>
                                Jeg elsker å jobbe! Jeg er en veldig flink arbeider og jeg er veldig glad i å hjelpe andre. 
                                Jeg har jobbet i mange forskjellige bransjer og har mye erfaring. Jeg er også veldig glad i å lære nye ting. 
                                Jeg er en veldig positiv person og jeg er veldig glad i å jobbe med andre. Jeg er også veldig glad i å hjelpe andre.
                            </p>
                        </div>
                    </div>
                    <div class="profile-achievements">
                        <div class="achievements">
                            <h3>Prestasjoner</h3>
                            <p>3 merker</p>
                            <div class="badge first-place">First</div>
                            <div class="badge speedy-runner">Ten</div>
                            <div class="badge verify-place">Verified</div>
                        </div>
                    </div>
                </div>
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
