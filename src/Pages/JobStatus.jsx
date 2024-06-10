import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import Header from '../header';

const JobStatus = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jobRef = ref(database, 'jobs');
    onValue(jobRef, (snapshot) => {
      let jobFound = false;
      snapshot.forEach(userSnapshot => {
        const userJobs = userSnapshot.val();
        if (userJobs[jobId]) {
          setJob(userJobs[jobId]);
          jobFound = true;
        }
      });

      if (!jobFound) {
        setJob(null);
      }

      setLoading(false);
    });

    return () => {
      setJob(null); // Cleanup job state on unmount
    };
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!job) {
    return <div>No job found.</div>;
  }

  return (
    <div className="container">
      <Header />
      <h1>Job Status: {job.typeJobb}</h1>
      <p>Description: {job.beskrivelse}</p>
      <p>Employment Type: {job.ansettelsestype}</p>
      <p>Working Hours: {job.arbeidstid}</p>
      <p>Experience Level: {job.erfaring}</p>
      <p>County: {job.fylke}</p>
      <p>Category: {job.kategori}</p>
      <p>Postcode: {job.postnummer}</p>
      <p>Price: {job.pris} kr</p>
      <p>Additional Information: {job.tilleggsinfo}</p>
      <p>User Name: {job.userName}</p>
      {/* Render additional job details as needed */}
    </div>
  );
};

export default JobStatus;
