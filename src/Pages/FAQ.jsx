import React, { useState, useEffect } from 'react';
import './FAQ.css';
import Header from '../header';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { database } from '../firebaseConfig';
import useUserRole from '../hooks/useUserRole';

function FAQ() {
  const { role, isLoading } = useUserRole();
  const [faqData, setFaqData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // State to toggle between add/edit mode
  const [deleteMode, setDeleteMode] = useState(false); // State to toggle delete mode
  const [currentId, setCurrentId] = useState(null); // Current FAQ id for edit or delete
  const [selectedIds, setSelectedIds] = useState({}); // Selected FAQs for delete/edit

  useEffect(() => {
    const faqRef = ref(database, 'data/FAQ');
    onValue(faqRef, (snapshot) => {
      const data = snapshot.val();
      const loadedFaqs = Object.entries(data).map(([key, value]) => ({
        id: key,
        question: value.question,
        answer: value.answer,
      }));
      setFaqData(loadedFaqs);
    });
  }, []);

  const handleFaqClick = (index) => setActiveIndex(activeIndex === index ? null : index);

  const openAddModal = () => {
    setShowModal(true);
    setEditMode(false);
    setCurrentId(null);
    setNewQuestion('');
    setNewAnswer('');
  };

  const openEditModal = (faq) => {
    setShowModal(true);
    setEditMode(true);
    setCurrentId(faq.id);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
  };

  const handleSave = () => {
    const faqRef = ref(database, `data/FAQ/${editMode ? currentId : ''}`);
    const method = editMode ? update : push;
    method(faqRef, { question: newQuestion, answer: newAnswer });
    setShowModal(false);
    setNewQuestion('');
    setNewAnswer('');
    clearSelection();
  };

  const handleDelete = () => {
    Object.keys(selectedIds).forEach((id) => {
      if (selectedIds[id]) {
        const faqRef = ref(database, `data/FAQ/${id}`);
        remove(faqRef);
      }
    });
    setDeleteMode(false);
    clearSelection();
  };

  const toggleSelectFaq = (id) => {
    setSelectedIds((prev) => {
      if (editMode) {
        return { [id]: !prev[id] }; // Only allow one selection in edit mode
      } else {
        return { ...prev, [id]: !prev[id] }; // Allow multiple selections in delete mode
      }
    });
  };

  const clearSelection = () => {
    setSelectedIds({});
  };

  const closeModal = () => {
    setShowModal(false);
    clearSelection();
  };

  const handleEditClick = () => {
    if (editMode) {
      const selectedId = Object.keys(selectedIds).find((id) => selectedIds[id]);
      const selectedFaq = faqData.find((faq) => faq.id === selectedId);

      if (selectedFaq) {
        openEditModal(selectedFaq);
      } else {
        setEditMode(false);
        clearSelection();
      }
    } else {
      setEditMode(true);
      setDeleteMode(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Header />
      <center className="faq-header">
        <h1>
          ofte stilte <span>spørsmål</span>
        </h1>
      </center>
      <div className="faqs-container" itemScope itemType="https://schema.org/FAQPage">
        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            className={`faq-singular ${activeIndex === index ? 'active' : ''}`}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <h2 className="faq-question" itemProp="name" onClick={() => handleFaqClick(index)}>
              {(editMode || deleteMode) && (
                <label className="custom-checkbox">
                  <input
                    id={`onTop-${faq.id}`}
                    type="checkbox"
                    checked={!!selectedIds[faq.id]}
                    onChange={() => toggleSelectFaq(faq.id)}
                  />
                  <span className="checkmark"></span>
                </label>
              )}
              {faq.question}
            </h2>
            {activeIndex === index && (
              <div className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">{faq.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {role === 'Admin' && (
        <div className="fab-container">
          <div className="add-fab" title="Legg til FAQ" onClick={openAddModal}>
            +
          </div>
          <div className="edit-fab" title="Rediger FAQ" onClick={handleEditClick}>
            {editMode ? '🖉' : '✎'}
          </div>
          <div className="delete-fab" title="Slett FAQ" onClick={deleteMode ? handleDelete : () => setDeleteMode(true)}>
            {deleteMode ? '✔' : '✖'}
          </div>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <label>Question:</label>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Question"
            />
            <label>Answer:</label>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Answer"
            />
            <button onClick={handleSave}>{editMode ? 'Update' : 'Add'} FAQ</button>
          </div>
        </div>
      )}
      <Footer />
      <NavigationBar />
    </div>
  );
}

export default FAQ;
