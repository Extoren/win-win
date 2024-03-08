import React from 'react';
import './settings.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';

function Settings() {
    

    return (
        <div className="container">
            <Header />
               <div className="settings">
                <center className="settings-header">
                    <h1>Innstillinger</h1>
                </center>
                {/* make alot of buttons */}
                <div className="settings-holder">
                    <div className="settings-text">
                        <p>Generelt</p>
                    </div>
                    <div className="settings-buttons">

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-user-shield" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Verifiser</h1>
                                    <p style={{margin: 0}}>Bekreft din identitet.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-envelope" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Endre e-post</h1>
                                    <p style={{margin: 0}}>Endre din nåværende e-postadresse.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-user-edit" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Endre navn</h1>
                                    <p style={{margin: 0}}>Endre ditt registrerte navn.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-lock" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Personvern</h1>
                                    <p style={{margin: 0}}>Administrer personverninnstillinger.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-lightbulb" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Lys modus</h1>
                                    <p style={{margin: 0}}>Bytt lys modus.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-user-cog" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Endre rolle</h1>
                                    <p style={{margin: 0}}>Endre din rolle i systemet.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-bell" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Varsler</h1>
                                    <p style={{margin: 0}}>Administrer varslingsinnstillinger.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-history" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Aktivitetshistorikk</h1>
                                    <p style={{margin: 0}}>Se en oversikt over din aktivitet.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-exclamation-triangle" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Rapporter problem</h1>
                                    <p style={{margin: 0}}>Meld fra om et problem eller en feil.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-comments" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}}>Kontakt oss</h1>
                                    <p style={{margin: 0}}>Ta kontakt med kundeservice.</p>
                                </div>
                            </div>
                        </button>

                        <button>
                            <div style={{display: 'flex'}}>
                                <i class="fas fa-trash-alt" id="red" style={{marginRight: '20px'}}></i>
                                <div>
                                    <h1 style={{margin: 0}} id="red">Slett konto</h1>
                                    <p style={{margin: 0}}>Slett din konto permanent.</p>
                                </div>
                            </div>
                        </button>

                    </div>
                </div>
            </div>
            <NavigationBar />
        </div>
    );
}

export default Settings;
