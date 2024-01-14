import logo from '../Bilder/Logo_CC.png';
import React from 'react';
import './FAQ.css';

function FAQ() {
    return (

        <div className="container">
        <div className="header">
          <div className="logo">
            <a href="../index.html">
              <img src={logo} alt="logo" id="logo" />
            </a>
            <p>Winstinct!</p>
          </div>
          <div className="header-menu-container">
            <div className="header-menu">
              <a href="../index.html">Finn Jobb</a>
              <a href="Templates/FAQ.html" className="active">
                FAQ
              </a>
            </div>
          </div>
          <div className="user-settings">
            <div className="dark-light">
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </div>
            <div className="user-menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-square"
              >
                <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                <image
                  xlinkHref="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg"
                  x={6}
                  y={6}
                  width={12}
                  height={12}
                />
              </svg>
              <div className="dropdown-menu">
                {/* Dropdown menu content goes here */}
                <a href="#" className="selected-location">
                  Norsk
                </a>
                <a href="#">English</a>
              </div>
            </div>
            {/*<img class="user-profile" src="#" alt="">*/}
            <a href="./login.html">
              <div className="user-name">Logg inn</div>
            </a>
          </div>
        </div>
        <div className="wrapper">
          <center>
            <h1>ofte stilte spørsmål</h1>
          </center>
          <div
            className="faqs-container"
            itemScope=""
            itemType="https://schema.org/FAQPage"
          >
            <div
              className="faq-singular"
              itemScope=""
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h2 className="faq-question" itemProp="name">
                Hva
              </h2>
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
            </div>
            <div
              className="faq-singular"
              itemScope=""
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h2 className="faq-question" itemProp="name">
                Hvorfor
              </h2>
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
            </div>
            <div
              className="faq-singular"
              itemScope=""
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h2 className="faq-question" itemProp="name">
                Hvordan
              </h2>
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
            </div>
            <div
              className="faq-singular"
              itemScope=""
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h2 className="faq-question" itemProp="name">
                Hvor
              </h2>
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
            </div>
          </div>
        </div>
      </div>

    );
}

export default FAQ;