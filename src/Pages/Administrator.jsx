import React, { useState, useEffect } from 'react';
import Header from '../header';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import NavigationBar from '../NavigationBar';
import { useAdmin } from '../AdminContext';
import './Administrator.css';
import { database } from '../firebaseConfig'; 
import { doc, updateDoc, getFirestore, onSnapshot, increment } from 'firebase/firestore';

function Administrator() {
    const [key, setKey] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('locations');
    const [submitClicks, setSubmitClicks] = useState(0);
    const [deleteClicks, setDeleteClicks] = useState(0);
    const db = getFirestore();

    useEffect(() => {
        const docRef = doc(db, "clickCounts", "actions");
        const unsub = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setSubmitClicks(data.submit);
                setDeleteClicks(data.delete);
            }
        });

        return () => unsub();
    }, [db]);

    const { addNewItem, updateItemName, deleteItem } = useAdmin() || {};

    const updateFirestoreClicks = async (actionType) => {
        const docRef = doc(db, "clickCounts", "actions");
        const fieldIncrement = increment(1);
        if (actionType === 'submit') {
            await updateDoc(docRef, { submit: fieldIncrement });
        } else if (actionType === 'delete') {
            await updateDoc(docRef, { delete: fieldIncrement });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let promise;

        if (key) {
            promise = updateItemName(type, key, name);
        } else {
            promise = addNewItem(type, name);
        }

        try {
            await promise;
            alert('Operation successful.');
            setKey('');
            setName('');
            await updateFirestoreClicks('submit');
        } catch (error) {
            alert('An error occurred:', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!key) {
            alert('Please enter a key to delete.');
            return;
        }

        try {
            await deleteItem(type, key);
            alert('Item deleted successfully.');
            setKey('');
            setName('');
            await updateFirestoreClicks('delete');
        } catch (error) {
            alert('An error occurred:', error);
        }
    };

    const data = {
        labels: ['Submit', 'Delete'],
        datasets: [
            {
                label: 'Button Clicks',
                backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)'],
                data: [submitClicks, deleteClicks]
            },
        ],
    };

    return (
        <div>
            <Header />
            <h1>Administrator</h1>
            <div className="AdminContainer">
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
                <div className="DataChange">
                    <Bar data={data} />
                </div>
            </div>
            <NavigationBar />
        </div>
    );
}

export default Administrator;
