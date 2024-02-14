import React from 'react';
import './myJobs.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';

function myJobs() {
    

    return (
        <div className="container">
            <Header />
            <div className="myJobs">
                <h1>Dine Oppdrag <br></br>
                    vil vises her :)
                </h1>
                <div className="job-container">
                    <div className="job">
                    </div>
                </div>
            </div>
            <NavigationBar />
            <Footer />
        </div>
    );
}

export default myJobs;
