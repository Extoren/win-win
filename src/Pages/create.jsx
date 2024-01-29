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
    const [description, setDescription] = useState('Beskrivelse');
    const [additionalInfo, setAdditionalInfo] = useState('Tilleggsinfo');
    const [price, setPrice] = useState('');
    const [arbeidstid, setArbeidstid] = useState('Arbeidstid');
    const [postalCode, setPostalCode] = useState('Postnummer');

    const [isFylkeOpen, setIsFylkeOpen] = useState(false);
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isErfaringOpen, setIsErfaringOpen] = useState(false);
    const [isAnsettelsestypeOpen, setIsAnsettelsestypeOpen] = useState(false);

    const [selectedErfaring, setSelectedErfaring] = useState('Ansiennitetsnivå');
    const [fylke, setSelectedFylke] = useState('Fylke');
    const [selectedType, setSelectedType] = useState('Kategori');
    const [selectedAnsettelsestype, setSelectedAnsettelsestype] = useState('Ansettelsestype');

    const handleDescriptionChange = (event) => {
        let inputValue = event.target.value;
        // Allow new lines, letters, numbers, and common punctuation.
        inputValue = inputValue.replace(/[^\w\s,.!?;:æøå()'"-]/g, "");
        // Replace newline characters with <br /> tags
        inputValue = inputValue.replace(/\n/g, "<br />");
        setDescription(inputValue);
      };

    const handleArbeidstidChange = (event) => {
    setArbeidstid(event.target.value);   
    };

    const handleAdditionalInfoChange = (event) => {
        let inputValue = event.target.value;
        // Modify this line as per your requirement for character filtering
        inputValue = inputValue.replace(/[^\w\s,.!?;:æøå()'"-]/g, "");
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
    
    const handlePostalCodeChange = (event) => {
        const newValue = event.target.value;
        if (newValue > 9999) {
            alert("Postnummeret kan ikke være høyere enn 9999");
            setPostalCode(9999); // Optional: Set the value to the max limit
        } else {
            setPostalCode(newValue);
        }
    };
    
    
    // Refs for dropdowns
    const fylkeRef = useRef(null);
    const typeRef = useRef(null);
    const erfaringRef = useRef(null);
    const ansettelsestypeRef = useRef(null);
    const typeToggleButtonRef = useRef(null);


    // Close dropdown when clicked outside
    useOutsideClick(fylkeRef, () => {
        if (isFylkeOpen) setIsFylkeOpen(false);
    });

    useOutsideClick(typeRef, () => {
        if (isTypeOpen) setIsTypeOpen(false);
    }, typeToggleButtonRef);

    useOutsideClick(erfaringRef, () => {
        if (isErfaringOpen) setIsErfaringOpen(false);
    });

    useOutsideClick(ansettelsestypeRef, () => {
        if (isAnsettelsestypeOpen) setIsAnsettelsestypeOpen(false);
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

    const toggleAnsettelsestypeDropdown = () => {
        setIsAnsettelsestypeOpen(!isAnsettelsestypeOpen);
    }

    // Event handler for dropdown option click
    const handleOptionClick = (option, dropdown) => {
        if (dropdown === 'fylke') {
            setIsFylkeOpen(false);
            setSelectedFylke(option);
        } if (dropdown === 'type') {
            setIsTypeOpen(false);
            setSelectedType(option);
        } if (dropdown === 'erfaring') {
            setIsErfaringOpen(false);
            setSelectedErfaring(option);
        } if (dropdown === 'ansettelsestype') {
            setIsAnsettelsestypeOpen(false);
            setSelectedAnsettelsestype(option);
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
                            <label htmlFor="type" className="form-label">Type Jobb</label>
                            <button ref={typeToggleButtonRef} id="type" className="form-select" type="button" onClick={toggleTypeDropdown}>
                            {selectedType}
                            </button>
                            {isTypeOpen && (
                                <ul ref={typeRef}>
                                    <button onClick={() => handleOptionClick('Barnepass', 'type')}>Barnepass</button>
                                    <button onClick={() => handleOptionClick('Gressklipping', 'type')}>Gressklipping</button>
                                    <button onClick={() => handleOptionClick('Løvrydding', 'type')}>Løvrydding</button>
                                    <button onClick={() => handleOptionClick('Snømåking', 'type')}>Snømåking</button>
                                    <button onClick={() => handleOptionClick('Hundelufting', 'type')}>Hundelufting</button>
                                    <button onClick={() => handleOptionClick('Vaske biler', 'type')}>Vaske biler</button>
                                    <button onClick={() => handleOptionClick('Selge produkter', 'type')}>Selge produkter</button>
                                    <button onClick={() => handleOptionClick('Lekerengjøring', 'type')}>Lekerengjøring</button>
                                    <button onClick={() => handleOptionClick('Plantepleie', 'type')}>Plantepleie</button>
                                    <button onClick={() => handleOptionClick('Bake og selge kaker', 'type')}>Bake og selge kaker</button>
                                    <button onClick={() => handleOptionClick('Hjemmeorganisering', 'type')}>Hjemmeorganisering</button>
                                    <button onClick={() => handleOptionClick('Hente posten', 'type')}>Hente posten</button>
                                    <button onClick={() => handleOptionClick('Babysitting', 'type')}>Babysitting</button>
                                    <button onClick={() => handleOptionClick('Male gjerder', 'type')}>Male gjerder</button>
                                    <button onClick={() => handleOptionClick('Småreparasjoner', 'type')}>Småreparasjoner</button>
                                    <button onClick={() => handleOptionClick('Levere aviser', 'type')}>Levere aviser</button>
                                    <button onClick={() => handleOptionClick('Organisere garasjesalg', 'type')}>Organisere garasjesalg</button>
                                    <button onClick={() => handleOptionClick('Datatjenester for eldre', 'type')}>Datatjenester for eldre</button>
                                    <button onClick={() => handleOptionClick('Hjelpe med hagearbeid', 'type')}>Hjelpe med hagearbeid</button>
                                    <button onClick={() => handleOptionClick('Vannplanter for naboer', 'type')}>Vannplanter for naboer</button>
                                    <button onClick={() => handleOptionClick('Hjelpe til med å flytte', 'type')}>Hjelpe til med å flytte</button>
                                </ul>
                            )}
                        </div>
                        <div className="flex-container">
                            <div>
                                <label htmlFor="Fylke" className="form-label">Fylke</label>
                                <button id="type" className="form-select" type="button" onClick={toggleFylkeDropdown}>
                                {fylke}
                                {/* SVG icon */}
                                </button>
                                {isFylkeOpen && (
                                    <ul ref={fylkeRef}>
                                        <button onClick={() => handleOptionClick('Agder', 'fylke')}>Agder</button>
                                        <button onClick={() => handleOptionClick('Innlandet', 'fylke')}>Innlandet</button>
                                        <button onClick={() => handleOptionClick('Møre og Romsdal', 'fylke')}>Møre og Romsdal</button>
                                        <button onClick={() => handleOptionClick('Nordland', 'fylke')}>Nordland</button>
                                        <button onClick={() => handleOptionClick('Oslo', 'fylke')}>Oslo</button>
                                        <button onClick={() => handleOptionClick('Rogaland', 'fylke')}>Rogaland</button>
                                        <button onClick={() => handleOptionClick('Svalbard', 'fylke')}>Svalbard</button>
                                        <button onClick={() => handleOptionClick('Troms og Finnmark', 'fylke')}>Troms og Finnmark</button>
                                        <button onClick={() => handleOptionClick('Trøndelag', 'fylke')}>Trøndelag</button>
                                        <button onClick={() => handleOptionClick('Vestfold og Telemark', 'fylke')}>Vestfold og Telemark</button>
                                        <button onClick={() => handleOptionClick('Vestland', 'fylke')}>Vestland</button>
                                        <button onClick={() => handleOptionClick('Viken', 'fylke')}>Viken</button>
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="postalCode" className="form-label">Postnummer</label>
                                <input
                                    type="number"
                                    id="postalCode"
                                    className="form-input"
                                    placeholder="Skriv inn postnummer"
                                    required
                                    onChange={handlePostalCodeChange}
                                    max="4"
                                />
                            </div>
                        </div>
                        <div className="flex-container">
                    
                            <div>
                                <label htmlFor="type" className="form-label">Erfaring</label>
                                <button id="type" className="form-select" type="button" onClick={toggleErfaringDropdown}>
                                {selectedErfaring}
                                {/* SVG icon */}
                                </button>
                                {isErfaringOpen && (
                                    <ul ref={erfaringRef}>
                                        <button onClick={() => handleOptionClick('Studentnivå', 'erfaring')}>Studentnivå</button>
                                        <button onClick={() => handleOptionClick('Inngangsnivå', 'erfaring')}>Inngangsnivå</button>
                                        <button onClick={() => handleOptionClick('Midtnivå', 'erfaring')}>Midtnivå</button>
                                        <button onClick={() => handleOptionClick('Seniornivå', 'erfaring')}>Seniornivå</button>
                                        <button onClick={() => handleOptionClick('Regissører', 'erfaring')}>Regissører</button>
                                        <button onClick={() => handleOptionClick('VP eller over', 'erfaring')}>VP eller over</button>
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label htmlFor="type" className="form-label">Ansettelsestype</label>
                                <button id="type" className="form-select" type="button" onClick={toggleAnsettelsestypeDropdown}>
                                {selectedAnsettelsestype}
                                </button>
                                {isAnsettelsestypeOpen && (
                                    <ul ref={ansettelsestypeRef}>
                                        <button onClick={() => handleOptionClick('Heltidsjobber', 'ansettelsestype')}>Heltidsjobber</button>
                                        <button onClick={() => handleOptionClick('Deltidsjobber', 'ansettelsestype')}>Deltidsjobber</button>
                                        <button onClick={() => handleOptionClick('Eksterne jobber', 'ansettelsestype')}>Eksterne jobber</button>
                                        <button onClick={() => handleOptionClick('Seniornivå', 'ansettelsestype')}>Seniornivå</button>
                                        <button onClick={() => handleOptionClick('Kontrakt', 'ansettelsestype')}>Kontrakt</button>
                                        <button onClick={() => handleOptionClick('Små jobber', 'ansettelsestype')}>Små jobber</button>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="flex-container">
                        <div>
                                <label htmlFor="price" className="form-label">Arbeidstid</label>
                                    <textarea
                                        type="text"
                                        id="form-textarea"
                                        className="form-input"
                                        placeholder="Skriv inn klokke arbeidstid"
                                        required
                                        onChange={handleArbeidstidChange}
                                        maxLength="10"
                                    />
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
                            <label htmlFor="description" className="form-label">Beskrivelse</label>
                            <textarea
                            id="description"
                            className="form-textarea"
                            placeholder="Skriv inn beskrivelse"
                            required
                            onChange={handleDescriptionChange}
                            />
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
                            {getImg('default')}
                        </div>
                        <div className="job-logos">
                            {getSvg('default')}
                        </div>
                        <div className="job-explain-content">
                            <div className="job-title-wrapper">
                            <div className="job-card2-title">{selectedType}</div>
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
                                <span className="comp-location">{fylke} - {postalCode}</span>
                            </div>
                            <div className="posted">
                                Lagt ut for ANTALL dag(er) siden
                                <span className="app-number">0 applikasjoner</span>
                            </div>
                            </div>
                            <div className="explain-bar">
                            <div className="explain-contents">
                                <div className="explain-title">Ansiennitetsnivå</div>
                                <div className="explain2-subtitle">{selectedErfaring}</div>
                            </div>
                            <div className="explain-contents">
                                <div className="explain-title">Ansettelsestype</div>
                                <div className="explain2-subtitle">{selectedAnsettelsestype}</div>
                            </div>
                            <div className="explain-contents">
                                <div className="explain-title">Arbeidstid</div>
                                <div className="explain2-subtitle">{arbeidstid}</div>
                            </div>
                            <div className="explain-contents">
                                <div className="explain-title">Tilby lønn</div>
                                <div className="explain2-subtitle">{price} kr</div>
                            </div>
                            </div>
                            <div className="overview2-text">
                            <div className="overview2-text-header">Oversikt</div>
                            <div className="overview2-text-subheader">
                                <div dangerouslySetInnerHTML={{ __html: description }} />
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