import React, { useState, useRef, useEffect } from 'react';
import './create.css';
import Header from '../header';
import getSvg  from '../Accesorios/getSvg';
import getImg  from '../Accesorios/getImg';
import jobsData from '../jobsData';

function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}

const Create = () => {
    const job = jobsData[0];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [price, setPrice] = useState('');

    const [isFylkeOpen, setIsFylkeOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isErfaringOpen, setIsErfaringOpen] = useState(false);

    // Event handler for title input change
    const handleTitleChange = (event) => {
        let inputValue = event.target.value;
        // Remove any non-alphanumeric characters
        inputValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");
        setTitle(inputValue);
    };

    const handleDescriptionChange = (event) => {
        let inputValue = event.target.value;
        // Remove any non-alphanumeric characters (or modify this line as per your requirement)
        inputValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");
        setDescription(inputValue);
    };

    const handleAdditionalInfoChange = (event) => {
        let inputValue = event.target.value;
        // Modify this line as per your requirement for character filtering
        inputValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, "");
        setAdditionalInfo(inputValue);
    };

    const handlePriceChange = (event) => {
        const newValue = event.target.value;
        if (newValue > 9999) {
            alert("Tjenesten kan ikke være høyere enn 9999");
            setPrice(9999); // Optional: Set the value to the max limit
        } else {
            setPrice(newValue);
        }
    };
    
    
    
    // Refs for dropdowns
    const fylkeRef = useRef(null);
    const typeRef = useRef(null);
    const erfaringRef = useRef(null);


    // Close dropdown when clicked outside
    useOutsideClick(fylkeRef, () => {
        if (isFylkeOpen) setIsFylkeOpen(false);
    });

    useOutsideClick(typeRef, () => {
        if (isTypeOpen) setIsTypeOpen(false);
    });

    useOutsideClick(erfaringRef, () => {
        if (isErfaringOpen) setIsErfaringOpen(false);
    });

    // Event handler for dropdown toggle
    const toggleFylkeDropdown = () => {
        setIsFylkeOpen(!isFylkeOpen);
    };

    const toggleTypeDropdown = () => {
        setIsTypeOpen(!isTypeOpen);
    };

    const toggleErfaringDropdown = () => {
        setIsErfaringOpen(!isErfaringOpen);
    };

    // Event handler for dropdown option click
    const handleOptionClick = (dropdown) => {
        if (dropdown === 'fylke') {
            setIsFylkeOpen(false);
        } else if (dropdown === 'type') {
            setIsTypeOpen(false);
        } else if (dropdown === 'erfaring') {
            setIsErfaringOpen(false);
        }
    };
    return (
        <div className="container">
            <Header />
            <div className="create-job-listing-container">
                <div className="form-container2">
                    <div className="form-header">
                        <h1 className="form-title">Lag jobboppføring</h1>
                        <p className="form-subtitle">Skriv inn detaljene for stillingsannonsen</p>
                    </div>
                    <div className="form-body">
                        <div>
                            <label htmlFor="title" className="form-label">Tittel</label>
                            <input
                                maxLength="50"
                                id="title"
                                className="form-input"
                                placeholder="Skriv inn stillingstittel"
                                required
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="flex-container">
                            <div>
                                <label htmlFor="Fylke" className="form-label">Fylke</label>
                                <button id="type" className="form-select" type="button" onClick={toggleFylkeDropdown}>
                                Velg Fylke
                                {/* SVG icon */}
                                </button>
                                {isFylkeOpen && (
                                    <ul ref={fylkeRef}>
                                        <button onClick={() => handleOptionClick('Agder')}>Agder</button>
                                        <button onClick={() => handleOptionClick('Innlandet')}>Innlandet</button>
                                        <button onClick={() => handleOptionClick('Møre og Romsdal')}>Møre og Romsdal</button>
                                        <button onClick={() => handleOptionClick('Nordland')}>Nordland</button>
                                        <button onClick={() => handleOptionClick('Oslo')}>Oslo</button>
                                        <button onClick={() => handleOptionClick('Rogaland')}>Rogaland</button>
                                        <button onClick={() => handleOptionClick('Svalbard')}>Svalbard</button>
                                        <button onClick={() => handleOptionClick('Troms og Finnmark')}>Troms og Finnmark</button>
                                        <button onClick={() => handleOptionClick('Trøndelag')}>Trøndelag</button>
                                        <button onClick={() => handleOptionClick('Vestfold og Telemark')}>Vestfold og Telemark</button>
                                        <button onClick={() => handleOptionClick('Vestland')}>Vestland</button>
                                        <button onClick={() => handleOptionClick('Viken')}>Viken</button>
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="postalCode" className="form-label">Postnummer</label>
                                <input
                                    id="postalCode"
                                    className="form-input"
                                    placeholder="Skriv inn postnummer"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex-container">
                            <div>
                                <label htmlFor="type" className="form-label">Type Jobb</label>
                                <button id="type" className="form-select" type="button" onClick={toggleTypeDropdown}>
                                Velg Kategori
                                {/* SVG icon */}
                                </button>
                                {isTypeOpen && (
                                    <ul ref={typeRef}>
                                        <button onClick={() => handleOptionClick('Barnepass')}>Barnepass</button>
                                        <button onClick={() => handleOptionClick('Gressklipping')}>Gressklipping</button>
                                        <button onClick={() => handleOptionClick('Løvrydding')}>Løvrydding</button>
                                        <button onClick={() => handleOptionClick('Snømåking')}>Snømåking</button>
                                        <button onClick={() => handleOptionClick('Hundelufting')}>Hundelufting</button>
                                        <button onClick={() => handleOptionClick('Vaske biler')}>Vaske biler</button>
                                        <button onClick={() => handleOptionClick('Selge produkter')}>Selge produkter</button>
                                        <button onClick={() => handleOptionClick('Lekerengjøring')}>Lekerengjøring</button>
                                        <button onClick={() => handleOptionClick('Plantepleie')}>Plantepleie</button>
                                        <button onClick={() => handleOptionClick('Bake og selge kaker')}>Bake og selge kaker</button>
                                        <button onClick={() => handleOptionClick('Hjemmeorganisering')}>Hjemmeorganisering</button>
                                        <button onClick={() => handleOptionClick('Hente posten')}>Hente posten</button>
                                        <button onClick={() => handleOptionClick('Babysitting')}>Babysitting</button>
                                        <button onClick={() => handleOptionClick('Male gjerder')}>Male gjerder</button>
                                        <button onClick={() => handleOptionClick('Småreparasjoner')}>Småreparasjoner</button>
                                        <button onClick={() => handleOptionClick('Levere aviser')}>Levere aviser</button>
                                        <button onClick={() => handleOptionClick('Organisere garasjesalg')}>Organisere garasjesalg</button>
                                        <button onClick={() => handleOptionClick('Datatjenester for eldre')}>Datatjenester for eldre</button>
                                        <button onClick={() => handleOptionClick('Hjelpe med hagearbeid')}>Hjelpe med hagearbeid</button>
                                        <button onClick={() => handleOptionClick('Vannplanter for naboer')}>Vannplanter for naboer</button>
                                        <button onClick={() => handleOptionClick('Hjelpe til med å flytte')}>Hjelpe til med å flytte</button>
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="type" className="form-label">Erfaring</label>
                                <button id="type" className="form-select" type="button" onClick={toggleErfaringDropdown}>
                                Velg Ansiennitetsnivå
                                {/* SVG icon */}
                                </button>
                                {isErfaringOpen && (
                                    <ul ref={erfaringRef}>
                                        <button onClick={() => handleOptionClick('Studentnivå')}>Studentnivå</button>
                                        <button onClick={() => handleOptionClick('Inngangsnivå')}>Inngangsnivå</button>
                                        <button onClick={() => handleOptionClick('Midtnivå')}>Midtnivå</button>
                                        <button onClick={() => handleOptionClick('Seniornivå')}>Seniornivå</button>
                                        <button onClick={() => handleOptionClick('Regissører')}>Regissører</button>
                                        <button onClick={() => handleOptionClick('VP eller over')}>VP eller over</button>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Beskrivelse</label>
                            <textarea
                            id="description"
                            className="form-textarea"
                            placeholder="Skriv inn beskrivelse"
                            required
                            onChange={handleDescriptionChange}
                            />
                        </div>
                        <div className="flex-container">
                            <div>
                                <label htmlFor="type" className="form-label">Ansettelsestype</label>
                                <button id="type" className="form-select" type="button">
                                Velg Ansettelsestype
                                {/* SVG icon */}
                                </button>
                            </div>
                            <div>
                                <label htmlFor="price" className="form-label">Pris</label>
                                    <input
                                        type="number"
                                        id="price"
                                        className="form-input"
                                        placeholder="Skriv inn jobbpris"
                                        required
                                        onChange={handlePriceChange}
                                        max="9999"
                                    />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" className="form-label">Tilleggsinfo (ekstra)</label>
                            <textarea
                            id="description"
                            className="form-textarea"
                            placeholder="Skriv inn tilleggsinfo"
                            required
                            onChange={handleAdditionalInfoChange}
                            />
                        </div>
                    <button
                        className="form-submit-button"
                        type="submit"
                    >
                        Lag Jobb
                    </button>
                    </div>
                </div>
                <div className="image-container">
                    <div className="job-overview2">
                        <div className="job-explain2">
                        <div className="job-bg">
                            {getImg(job.img)}
                        </div>
                        <div className="job-logos">
                            {getSvg(job.svg)}
                        </div>
                        <div className="job-explain-content">
                            <div className="job-title-wrapper">
                            <div className="job-card2-title">{title}</div>
                            <div className="job-action">
                                <svg
                                className="heart"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                >
                                <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                                </svg>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-share-2"
                                >
                                <circle cx={18} cy={5} r={3} />
                                <circle cx={6} cy={12} r={3} />
                                <circle cx={18} cy={19} r={3} />
                                <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                                </svg>
                            </div>
                            </div>
                            <div className="job-subtitle-wrapper">
                            <div className="company-name">
                                 {job.name}
                                <span className="comp-location">{/*{job.county}, {job.postalCode}*/}</span>
                            </div>
                            <div className="posted">
                                Lagt ut for ANTALL dag(er) siden
                                <span className="app-number">0 applikasjoner</span>
                            </div>
                            </div>
                            <div className="explain-bar">
                            <div className="explain-contents">
                                <div className="explain-title">Erfaring</div>
                                <div className="explain2-subtitle">(Erfaring)</div>
                            </div>
                            <div className="explain-contents">
                                <div className="explain-title">Type ansatt</div>
                                <div className="explain2-subtitle">(Ansiennitetsnivå)</div>
                            </div>
                            <div className="explain-contents">
                                <div className="explain-title">Ansettelsestype</div>
                                <div className="explain2-subtitle">(Ansettelsestype)</div>
                            </div>
                            <div className="explain-contents">
                                <div className="explain-title">Tilby lønn</div>
                                <div className="explain2-subtitle">{price} kr</div>
                            </div>
                            </div>
                            <div className="overview2-text">
                            <div className="overview2-text-header">Oversikt</div>
                            <div className="overview2-text-subheader">
                            {description}
                            </div>
                            </div>
                            <div className="overview2-text">
                            <div className="overview2-text-header">
                                Stillingsbeskrivelse
                            </div>
                            <div className="overview2-text-item">{additionalInfo}</div>
                            <br></br>
                            </div>
                            <button className="search-buttons card-buttons">
                            Søk Nå
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Create;