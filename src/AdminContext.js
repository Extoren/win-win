import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, push, set, update, remove, get } from 'firebase/database';
import { database } from './firebaseConfig';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [data, setData] = useState({
    locations: {},
    Employment: {},
    Experience: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const types = ['locations', 'Employment', 'Experience'];
      const dataPromises = types.map(type =>
        get(ref(database, `data/${type}`)).then(snapshot =>
          snapshot.exists() ? snapshot.val() : {}
        )
      );

      const results = await Promise.all(dataPromises);
      setData({
        locations: results[0],
        Employment: results[1],
        Experience: results[2]
      });
    };

    fetchData();
  }, []);

  const addNewItem = (type, name) => {
    const newDataRef = push(ref(database, `data/${type}`));
    return set(newDataRef, name);
  };

  const updateItemName = (type, key, newName) => {
    if (!key || !newName) {
      console.error("Invalid key or name for update.");
      return Promise.reject("Invalid key or name for update.");
    }
  
    const updates = {};
    const updatePath = `/data/${type}/${key}`;
    updates[updatePath] = newName;
  
    console.log(`Updating at ${updatePath} with new name: ${newName}`);
  
    return update(ref(database), updates);
  };
  


  const deleteItem = (type, key) => {
    const deleteRef = ref(database, `data/${type}/${key}`);
    return remove(deleteRef);
  };

  return (
    <AdminContext.Provider value={{ data, addNewItem, deleteItem, updateItemName }}>
      {children}
    </AdminContext.Provider>
  );
};
