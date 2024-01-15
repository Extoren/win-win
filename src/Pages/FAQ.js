import React from 'react';
import './FAQ.css';

function FAQ() {
    return (

      <div className="container">
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