import React from 'react';
import './settings.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';

function Settings() {
    

    return (
        <div className="container">
            <Header />
               <div className="settings">
                <center className="settings-header">
                    <h1>innstillinger</h1>
                </center>
                {/* make alot of buttons */}
                <div className="settings-buttons">
                    <button>Endre passord</button>
                    <button>Endre e-post</button>
                    <button>Endre navn</button>
                    <button id="red">Slett konto</button>
                </div>
            </div>
            <Footer />
            <NavigationBar />
        </div>
    );
}

export default Settings;
