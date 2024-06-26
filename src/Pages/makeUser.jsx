import React, { useState, useContext } from 'react';
import './makeUser.css';
import Header from '../header';
import { useNavigate } from 'react-router-dom';
import { ref, update } from "firebase/database";
import { AuthContext } from '../AuthContext';
import { auth, database } from '../firebaseConfig';

const updateDatabaseWithUserData = (userId, formData) => {
    if (!userId || !formData) {
        console.error('Invalid user ID or form data for database update.');
        return;
    }

    const dbRef = ref(database, 'users/' + userId);
    console.log('Attempting to update database with user data:', formData);

    update(dbRef, formData)
        .then(() => {
            console.log('Database updated successfully with new user data!');
        })
        .catch((error) => {
            console.error('Error updating database:', error);
        });
};

function MakeUser() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
    });

    const handleSubmit = () => {
        const user = auth.currentUser;
        if (user && currentStep === 1 && formData.name && formData.surname && selectedOption) {
            const updatedFormData = {
                ...formData,
                email: user.email,
                role: selectedOption === 'option1' ? 'Barn' : 'Voksen', // Include the role based on the selected option
                isSetupComplete: true,
            };
    
            updateDatabaseWithUserData(user.uid, updatedFormData);
            setIsLoggedIn(true);
            navigate('/');
        } else {
            console.error("User is not authenticated or required information is missing");
        }
    };
    
    const handleRadioChange = (e) => {
        setSelectedOption(e.target.id);
    };

    const handleNameSurnameChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const canProceedToNextStep = () => {
        if (currentStep === 0 && selectedOption) {
            return true;
        } else if (currentStep === 1 && formData.name && formData.surname) {
            return true;
        } else if (currentStep === 2 && formData.email.includes('@')) {
            return true;
        }
        return false;
    };

    const handleNext = () => {
        if (canProceedToNextStep()) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="make-user">
                <div className="user">
                    <form>
                        <h1>Sett opp din bruker<br></br>😊</h1>
                        {currentStep === 0 && (
                            <div className="radio-container">
                                <div className="radio-wrapper">
                                    <input type="radio" id="option1" name="options" onChange={handleRadioChange} checked={selectedOption === 'option1'} required />
                                    <label htmlFor="option1">Barn</label>
                                </div>
                                <div className="radio-wrapper">
                                    <input type="radio" id="option2" name="options" onChange={handleRadioChange} checked={selectedOption === 'option2'} required />
                                    <label htmlFor="option2">Voksen</label>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <>
                                <label htmlFor="Fornavn">Fornavn</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleNameSurnameChange} required />

                                <label htmlFor="Etternavn">Etternavn</label>
                                <input type="text" name="surname" id="surname" value={formData.surname} onChange={handleNameSurnameChange} required />
                            </>
                        )}

                        <div className="button-container">
                            {currentStep > 0 && (
                                <button type="button" onClick={handleBack}>Tilbake</button>
                            )}

                            {currentStep < 1 && (
                                <button type="button" id="right" onClick={handleNext} disabled={!canProceedToNextStep()}>Neste</button>
                            )}
                            {currentStep === 1 && (
                                <button type="button" onClick={handleSubmit}>Submit</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MakeUser;
