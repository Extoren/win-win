import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, push, onValue, update, remove } from 'firebase/database';
import { database } from './firebaseConfig';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [locationNames, setLocationNames] = useState({});

  useEffect(() => {
    const locationNamesRef = ref(database, 'locationNames');
    onValue(locationNamesRef, (snapshot) => {
      if (snapshot.exists()) {
        setLocationNames(snapshot.val());
      } else {
        console.log("No location names found in Firebase.");
      }
    });
  }, []);

  const addNewLocation = (newLocationName) => {
    onValue(ref(database, 'data/locations'), (snapshot) => {
      const locations = snapshot.val();
      const nextKey = locations ? Object.keys(locations).length + 1 : 1;
      const updates = {};
      updates[`/data/locations/${nextKey}`] = newLocationName;
      return update(ref(database), updates);
    }, {
      onlyOnce: true
    });
  };
  

  const updateLocationName = (locationKey, newName) => {
    const updates = {};
    updates[`/data/locations/${locationKey}`] = newName;
    return update(ref(database), updates); 
  };
  
  const updateLocationKeyValue = (oldKey, newKey, newValue) => {
    // First, check if the new key already exists to avoid overwriting data
    const newKeyRef = ref(database, `data/locations/${newKey}`);
    return onValue(newKeyRef, (snapshot) => {
      if (snapshot.exists()) {
        // Handle the case where the new key already exists
        console.error(`The key ${newKey} already exists in the database.`);
      } else {
        // Proceed with the update since the new key does not exist
        const updates = {};
        updates[`data/locations/${newKey}`] = newValue;
      
        update(ref(database), updates)
          .then(() => {
            // Remove the old key after the new key-value pair has been written
            remove(ref(database, `data/locations/${oldKey}`))
              .then(() => {
                console.log(`Key-value pair updated from ${oldKey} to ${newKey}: ${newValue}`);
              })
              .catch(error => console.error(`Error removing old key ${oldKey}:`, error));
          })
          .catch(error => console.error(`Error updating to new key ${newKey}:`, error));
      }
    }, {
      onlyOnce: true
    });
  };

  const deleteLocation = (locationKey) => {
    const updates = {};
    updates[`/data/locations/${locationKey}`] = null;
    return update(ref(database), updates); // This should remove the location
  };

  return (
    <AdminContext.Provider value={{ locationNames, addNewLocation, deleteLocation, updateLocationName, updateLocationKeyValue }}>
      {children}
    </AdminContext.Provider>
  );
};
