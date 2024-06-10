import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { auth } from '../firebaseConfig';
import Header from '../header';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const alertsRef = ref(database, `alerts/${userId}`);
      
      const unsubscribe = onValue(alertsRef, (snapshot) => {
        const alertList = [];
        snapshot.forEach((childSnapshot) => {
          alertList.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        setAlerts(alertList);
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  return (
    <div className="alerts-page">
      <Header />
      <h1>Alle varsler</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        alerts.map(alert => (
          <div key={alert.id} className="alert-item">
            <p>{alert.message}</p>
            <p>{new Date(alert.timestamp).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Alerts;
