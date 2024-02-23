import React, { useState, useEffect } from 'react';
import './myJobs.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import { JobCard } from '../Home'

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  const [users, setUsers] = useState({});

  useEffect(() => {
    // Fetch users similar to Home.jsx
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      const usersObject = {};
      for (const key in usersData) {
        usersObject[key] = {
          name: usersData[key].name,
          surname: usersData[key].surname
        };
      }
      setUsers(usersObject);
    });
  }, []);
  
  useEffect(() => {
    // Fetch jobs similar to Home.jsx, including the user's name
    const jobsRef = ref(database, 'jobs');
    onValue(jobsRef, (snapshot) => {
      const jobsData = snapshot.val();
      const loadedJobs = [];
      for (const userId in jobsData) {
        for (const jobId in jobsData[userId]) {
          const user = users[userId];
          const userName = user ? `${user.name} ${user.surname}` : 'Unknown User';
          loadedJobs.push({
            id: jobId,
            ...jobsData[userId][jobId],
            userName: userName
          });
        }
      }
      setJobs(loadedJobs);
    });
  }, [users]); // Make sure to add users as a dependency
  

  useEffect(() => {
    const jobRef = ref(database, 'jobs');
    onValue(jobRef, (snapshot) => {
      const jobsArray = [];
      snapshot.forEach(childSnapshot => {
        const jobData = childSnapshot.val();
        jobsArray.push(jobData);
      });
      setJobs(jobsArray);
    });
  }, []);

  return (
    <div className="container">
      <Header />
        <center className="faq-header">
            <h1>Dine Oppdrag</h1>
        </center>
        <div className="myJobs">
            <div className="job-container">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} onClick={() => {}} />
                ))}
            </div>
        </div>
      <NavigationBar />
      <Footer />
    </div>
  );
}

export default MyJobs;
