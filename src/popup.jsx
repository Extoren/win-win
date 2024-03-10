import React from 'react';
import './App.css';
import popupLogo from './Bilder/Popup.png';
import { Link } from 'react-router-dom';

function Popup({ onClose }) { 

    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content">
          <div className="landing-page">
            <div className="content">
              <div className="container2">
                <button className="close" onClick={onClose}>X</button>
                <div className="image">
                  <img src={popupLogo} alt="logo" />
                </div>
                <div className="info">
                  <h1>Arbeid for de unge</h1>
                  <p>
                    Vi er et selskap som engasjerer seg aktivt for barns trivsel og utvikling. 
                    Med WinWin gir vi barn en tidlig mulighet til å tjene penger samtidig som de får verdifull erfaring fra arbeidslivet. <br /> <br />
                    Dette gir dem ikke bare økonomisk selvstendighet, men gir også en unik mulighet til å inkludere varierte arbeidserfaringer på sin CV.
                  </p>
                    <Link to="/Login">
                    <button>Kom i gang</button>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Popup;
  