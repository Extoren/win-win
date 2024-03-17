import React, { useState, useEffect, useContext } from 'react';
import './myJobs.css'; // Make sure you import your CSS file where you define the styles
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { ref, onValue, push, set, get, serverTimestamp } from 'firebase/database'; // Add missing imports here
import { database, auth } from '../firebaseConfig';
import { JobCard } from '../Home';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [view, setView] = useState(null);
  const [clickedButton, setClickedButton] = useState(null); // State to track the clicked button
  const { isLoggedIn } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  const [childEmail, setChildEmail] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleAddChild = async () => {
    console.log('Attempting to add child:', childEmail);
    // Add logging for the current user's authentication state and email
    if (auth.currentUser) {
        console.log('Current user is authenticated:', auth.currentUser.uid);
        console.log('Current user email:', auth.currentUser.email);
    } else {
        console.log('No authenticated user.');
        setConfirmationMessage('No authenticated user. Please log in and try again.');
        return; // Exit the function if there is no authenticated user
    }

    // Define a reference to the 'users' node in your Firebase Realtime Database
    const usersRef = ref(database, 'users');
    
    // Use a try...catch block to handle any potential errors
    try {
        // Use the get function from Firebase to retrieve the users once
        const snapshot = await get(usersRef);

        // Initialize a variable to store the child's UID if found
        let childUid = null;

        // Iterate over the user data to find a matching email
        snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            if (user.email && user.email.toLowerCase() === childEmail.toLowerCase()) {
                childUid = childSnapshot.key;
                console.log(`Found child UID: ${childUid}`);
            }
        });

        // If a child UID is found, proceed to create the parent request
        if (childUid) {
            const parentRequestRef = ref(database, `parentRequests/${childUid}`);
            const newRequestRef = push(parentRequestRef);
            await set(newRequestRef, {
                parentEmail: auth.currentUser.email,
                status: 'pending',
                timestamp: serverTimestamp()
            });

            console.log(`Parent request created for child UID: ${childUid}`);
            // Update the confirmation message and reset the email field
            setConfirmationMessage(`Request sent to ${childEmail}! Please wait for their confirmation.`);
            setChildEmail('');
        } else {
            console.log('No child found with that email.');
            // If no child is found with the email, update the confirmation message accordingly
            setConfirmationMessage('No child found with that email. Please check the email and try again.');
        }
    } catch (error) {
        // Log and show any errors
        console.error('Error adding child:', error);
        setConfirmationMessage('Error occurred. Please try again later.');
    }
};

  




  const navigate = useNavigate();

  const editJob = (jobData) => {
    navigate('/create', { state: { job: jobData } });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentUser) {
      const userJobsRef = ref(database, `jobs/${currentUser}`);
      onValue(userJobsRef, (snapshot) => {
        const userJobsData = snapshot.val();
        const loadedJobs = [];
        for (const jobId in userJobsData) {
          loadedJobs.push({
            id: jobId,
            ...userJobsData[jobId]
          });
        }
        setJobs(loadedJobs);
      });
    } else {
      setJobs([]);
    }
  }, [currentUser]);

  const renderJobsView = () => (
    <div className="myJobs">
      {jobs.map(job => (
        <div key={job.id}>
          <div className="job-buttons">
            <button className="Status-button" id="green" onClick={() => {}}>
              <i className="fas fa-signal"></i> Status
            </button>
            <button className="edit-job-button" onClick={() => editJob(job)}>
              <i className="fas fa-pencil-alt"></i> Rediger
            </button>
          </div>
          <JobCard job={job} onClick={() => {}} />
          <div className="job-buttons2">
            <button className="trash-button" id="red" onClick={() => {}}>
              <i className="fas fa-trash-alt"></i> Slett
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChildView = () => (
    <div className="myChild">
      <div className='child-card'>
        <h2>Legg til ditt barn</h2>
        <input
          placeholder='Epost'
          value={childEmail}
          onChange={(e) => setChildEmail(e.target.value)}
        />
        <button onClick={handleAddChild}>Legg til</button>
        {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      </div>
    </div>
  );

  return (
    <div className="container">
      <Header />
      <center className="faq-header" id="hid">
                    <div className="Status-menu">
        <button className={clickedButton === 'child' ? 'active' : ''} onClick={() => { setView('child'); setClickedButton('child'); }}>
          <i className="fas fa-child"></i> <br />Ditt barn
        </button>
        <button className={clickedButton === 'jobs' ? 'active' : ''} onClick={() => { setView('jobs'); setClickedButton('jobs'); }}>
          <i className="fas fa-globe"></i> <br />Dine oppdrag
        </button>
      </div>
      </center>
      {/* Conditional rendering based on the view */}
      {view === 'jobs' && renderJobsView()}
      {view === 'child' && renderChildView()}
      <NavigationBar />
    </div>
  );
}

export default MyJobs;