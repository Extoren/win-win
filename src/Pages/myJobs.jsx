import React, { useState, useEffect, useContext } from 'react';
import './myJobs.css'; // Make sure you import your CSS file where you define the styles
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { ref, onValue } from 'firebase/database';
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
    // Placeholder for your child's view
    <div>
      <h2>Your Child</h2>
      {/* Implement your child's view here */}
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