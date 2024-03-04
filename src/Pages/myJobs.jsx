import React, { useState, useEffect, useContext } from 'react';
import './myJobs.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { ref, onValue } from 'firebase/database';
import { database, auth } from '../firebaseConfig'; // Make sure to import auth here
import { JobCard } from '../Home';
import { AuthContext } from '../AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const { isLoggedIn } = useContext(AuthContext); // Use AuthContext
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const editJob = (jobData) => {
    navigate('/create', { state: { job: jobData } });
  };

  // Get the current user's ID from the auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user.uid); // Set the ID of the currently logged-in user
      } else {
        setCurrentUser(null); // No user is logged in
      }
    });

    // Cleanup subscription on unmount
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
      setJobs([]); // Clear jobs if no user is logged in
    }
  }, [currentUser]); // Depend on currentUser

  return (
    <div className="container">
      <Header />
      <center className="faq-header">
        <h1>Dine <span>Oppdrag</span></h1>
      </center>
      <div className="myJobs">
        <div className="job-container">
          {jobs.map(job => (
            <div key={job.id}>
              <button className="edit-job-button" onClick={() => editJob(job)}>Edit</button> {/* Edit button */}
              <JobCard job={job} onClick={() => {}} />
            </div>
          ))}
        </div>
      </div>
      <NavigationBar />
      <Footer />
    </div>
  );
}

export default MyJobs;