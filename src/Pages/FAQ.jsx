import React, { useState } from 'react';
import './FAQ.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';

function FAQ() {
    // State to keep track of the active FAQ
    const [activeIndex, setActiveIndex] = useState(0); // Sets the first item as active by default

    // Function to handle FAQ click
    const handleFaqClick = index => {
        if (activeIndex === index) {
            // If the clicked FAQ is already active, close it
            setActiveIndex(null);
        } else {
            // Otherwise, open the clicked FAQ
            setActiveIndex(index);
        }
    };

    return (
        <div className="container">
            <Header />
                <center>
                    <h1>ofte stilte spørsmål</h1>
                </center>
                <div
                    className="faqs-container"
                    itemScope=""
                    itemType="https://schema.org/FAQPage"
                >
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className={`faq-singular ${activeIndex === index ? 'active' : ''}`}
                            itemScope=""
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <h2
                                className="faq-question"
                                itemProp="name"
                                onClick={() => handleFaqClick(index)}
                            >
                                {['Hva', 'Hvorfor', 'Hvordan', 'Hvor', 'Hva', 'Hvorfor', 'Hvordan', 'Hvor'][index]}
                            </h2>
                            {activeIndex === index && (
                                <div
                                    className="faq-answer"
                                    itemScope=""
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                >
                                    <div itemProp="text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                        ever since the 1500s, when an unknown printer took a galley of
                                        type and scrambled it to make a type specimen book.
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            <NavigationBar />
            <Footer />
        </div>
    );
}

export default FAQ;
