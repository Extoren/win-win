import React, { useState } from 'react';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import { useAdmin } from '../AdminContext';
import './Administrator.css';

function Administrator() {
    const [key, setKey] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('locations'); // Can be 'locations', 'employment', or 'seniority'

    const { addNewItem, updateItemName, deleteItem } = useAdmin() || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        let promise;

        if (key) {
            // Update existing item
            promise = updateItemName(type, key, name);
        } else {
            // Add new item
            promise = addNewItem(type, name);
        }

        promise.then(() => {
            alert('Operation successful.');
            setKey('');
            setName('');
        }).catch((error) => {
            alert('An error occurred:', error);
        });
    };

    const handleDelete = (e) => {
        e.preventDefault();

        if (key) {
            deleteItem(type, key).then(() => {
                alert('Item deleted successfully.');
                setKey('');
                setName('');
            }).catch((error) => {
                alert('An error occurred:', error);
            });
        } else {
            alert('Please enter a key to delete.');
        }
    };

    return (
        <div>
            <Header />
            <h1>Administrator</h1>
            <form onSubmit={handleSubmit} className="DataChange">
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value="locations">Locations</option>
                    <option value="employment">Employment Types</option>
                    <option value="experience">Experience Levels</option>
                </select>
                <input
                    type="text"
                    placeholder="Key (leave empty to add new)"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button type="submit">
                    {key ? 'Update Item' : 'Add New Item'}
                </button>
                <button type="button" onClick={handleDelete}>
                    Delete Item
                </button>
            </form>
            <NavigationBar />
        </div>
    );
}

export default Administrator;
