import React, { useState } from 'react';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import { useAdmin } from '../AdminContext';

function Administrator() {
  const [locationKey, setLocationKey] = useState('');
  const [newLocationName, setNewLocationName] = useState('');

  const { addNewLocation = () => {}, updateLocationName = () => {}, deleteLocation = () => {} } = useAdmin() || {};

  const handleLocationChange = (e) => {
    e.preventDefault();

    let promise;

    if (locationKey) {
      promise = updateLocationName(locationKey, newLocationName);
    } else {
      promise = addNewLocation(newLocationName);
    }

    promise.then(() => {
      alert('Location updated successfully.');
    }).catch((error) => {
      alert('An error occurred:', error);
    });
  };


  const handleDelete = (e) => {
    e.preventDefault();

    if (locationKey) {
      deleteLocation(locationKey).then(() => {
        alert('Location deleted successfully.');
      }).catch((error) => {
        alert('An error occurred:', error);
      });
    } else {
      alert('Please enter a location key to delete.');
    }
  };
  

  return (
    <div>
      <Header />
      <h1>Administrator</h1>
      <form onSubmit={handleLocationChange}>
        <input
          type="text"
          placeholder="Location Key (leave empty to add new)"
          value={locationKey}
          onChange={e => setLocationKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location Name"
          value={newLocationName}
          onChange={e => setNewLocationName(e.target.value)}
        />
        <button type="submit">
          {locationKey ? 'Change Location Name' : 'Add New Location'}
        </button>
        <button onClick={handleDelete}>
          Delete Location
        </button>
      </form>
      <NavigationBar />
    </div>
  );
}

export default Administrator;
