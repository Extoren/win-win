import React, { useState, useRef, useEffect } from 'react';
import { ref, set, push } from 'firebase/database';
import { auth, database } from '../firebaseConfig';
import './create.css';
import Header from '../header';
import getSvg  from '../Accesorios/getSvg';
import getImg  from '../Accesorios/getImg';
import { selectCategories } from '../selectCategories';
import NavigationBar from '../NavigationBar';
import { jobTypeCategoryMapping } from '../jobTypeCategoryMapping';
import { useLocation } from 'react-router-dom';

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

const LogoSelectionModal = ({ isOpen, onSelect, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const limit = 10;

    if (!isOpen) return null;

    const logos = [
        { english: 'leaf', norwegian: 'blad' },
        { english: 'child', norwegian: 'barn' },
        { english: 'heart', norwegian: 'hjerte' },
        { english: 'tools', norwegian: 'gressklipper' },
        { english: 'brush', norwegian: 'pensel' },
        { english: 'broom', norwegian: 'kost' },
        { english: 'tint', norwegian: 'vannkanne' },
        { english: 'camera', norwegian: 'kamera' },
        { english: 'car', norwegian: 'bil' },
        { english: 'coffee', norwegian: 'kaffe' },
        { english: 'cog', norwegian: 'tannhjul' },
        { english: 'flag', norwegian: 'flagg' },
        { english: 'globe', norwegian: 'globus' },
        { english: 'home', norwegian: 'hjem' },
        { english: 'tree', norwegian: 'tre' },
        { english: 'paw', norwegian: 'pote' }, 
        { english: 'seedling', norwegian: 'spire' }, 
        { english: 'utensils', norwegian: 'bestikk' }, 
        { english: 'dustpan', norwegian: 'feiebrett' }, 
        { english: 'snowflake', norwegian: 'snøfnugg' },
        { english: 'sun', norwegian: 'sol' }, 
        { english: 'recycle', norwegian: 'resirkulere' }, 
        { english: 'book', norwegian: 'bok' }, 
        { english: 'apple-alt', norwegian: 'eple' },
        { english: 'soap', norwegian: 'såpe' }, 
        { english: 'basketball-ball', norwegian: 'basketball' }, 
        { english: 'bed', norwegian: 'seng' }, 
        { english: 'desktop', norwegian: 'datamaskin' }, 
        { english: 'plug', norwegian: 'plugg' }, 
        { english: 'water', norwegian: 'vann' },
    ];

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const filteredLogos = logos.filter(logo => logo.norwegian.includes(searchTerm));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050,
        }} onClick={onClose}>
            <div onClick={handleModalClick} style={{
                position: 'relative',
                width: '80%',
                padding: '10%',
                backgroundColor: 'var(--inactive-color)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    fontSize: '24px',
                    cursor: 'pointer'
                }}>X</button>
                <h2 style={{ color: 'var(--body-color)' }}>Finn en passende logo</h2>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Søk etter logo"
                    style={{ margin: '10px', padding: '5px' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {filteredLogos.slice(0, limit).map((logo) => (
                        <button key={logo.english} onClick={() => onSelect(`fas fa-${logo.english}`)} style={{ margin: '10px', border: 'none', background: 'none' }}>
                            <i className={`fas fa-${logo.english}`} style={{ fontSize: '1.5em', color: 'var(--active-color)', border: '1px solid var(--border-color)', padding: '5px', borderRadius: '10px' }}></i>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


const Create = () => {
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

    const [inputValue, setInputValue] = useState('');
    const [logoModalOpen, setLogoModalOpen] = useState(false);
    const [selectedLogo, setSelectedLogo] = useState('');

    const location = useLocation();
    const jobData = location.state?.job;

    const handleOpenLogoModal = () => {
        setLogoModalOpen(true);
    };

    const handleSelectLogo = (selectedItem) => {
        const [logoClass] = selectedItem.split(':'); // Splitting based on a delimiter
        setSelectedLogo(logoClass);
        setLogoModalOpen(false); // Close the modal upon selection
    };
    

    const handleCloseLogoModal = () => {
        setLogoModalOpen(false);
    };

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
    
    const handleSubmit = () => {
        const user = auth.currentUser;

    if (user) {
        const userId = user.uid; // Use the authenticated user's UID
        const jobRef = push(ref(database, `jobs/${userId}`)); // Use `userId` here

        const jobData = {
            typeJobb: selectedType,
            fylke: fylke,
            postnummer: postalCode,
            erfaring: selectedErfaring,
            logo: selectedLogo,
            ansettelsestype: selectedAnsettelsestype,
            arbeidstid: arbeidstid,
            pris: price,
            beskrivelse: description,
            tilleggsinfo: additionalInfo,
            kategori: selectedCategory
        };
    
        set(jobRef, jobData)
            .then(() => alert('Jobb lagt til suksessfullt'))
            .catch((error) => alert('Det oppstod en feil: ', error));
    } else {
        alert('No authenticated user. Please log in.');
    }
};
    
    useEffect(() => {
        if (jobData) {
            // Pre-fill the form using jobData
            setDescription(jobData.beskrivelse || '');
            setAdditionalInfo(jobData.tilleggsinfo || '');
            setPrice(jobData.pris || '');
            setArbeidstid(jobData.arbeidstid || '');
            setPostalCode(jobData.postnummer || '');
            setSelectedErfaring(jobData.erfaring || 'Ansiennitetsnivå');
            setSelectedFylke(jobData.fylke || 'Fylke');
            setSelectedType(jobData.typeJobb || 'Kategori');
            setSelectedAnsettelsestype(jobData.ansettelsestype || 'Ansettelsestype');
            setSelectedLogo(jobData.logo || '');
            // Directly mark initial selection as made if editing
            setInitialSelectionMade(true);
        }
    }, [jobData]);
    
    // Refs for dropdowns
    const fylkeRef = useRef(null);
    const typeRef = useRef(null);
    const erfaringRef = useRef(null);
    const ansettelsestypeRef = useRef(null);
    const typeToggleButtonRef = useRef(null);


    const [initialSelectionMade, setInitialSelectionMade] = useState(false); // New state to manage initial selection


    const [hoverIndex, setHoverIndex] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleInitialSelection = (category) => {
        console.log("Selection made:", category.label);
        setInitialSelectionMade(true);
        setSelectedCategory(category.label);
        // Reset selected job type if the category changes
        setSelectedType('Kategori');
    };

    // Function to handle the "Go Back" action
    const handleGoBack = () => {
        setInitialSelectionMade(false);
    };

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
        setIsTypeOpen(prevState => !prevState);
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
            setSelectedType(option);
        } if (dropdown === 'erfaring') {
            setIsErfaringOpen(false);
            setSelectedErfaring(option);
        } if (dropdown === 'ansettelsestype') {
            setIsAnsettelsestypeOpen(false);
            setSelectedAnsettelsestype(option);
        }
    };

    useEffect(() => {
        // Apply the overflow: hidden; style to the body when the component is mounted
        document.body.style.overflow = 'hidden';
    
        // Remove the overflow: hidden; style from the body when the component is unmounted
        return () => {
          document.body.style.overflow = 'unset';
        };
      }, []);

    return (
        <div className="container">
            <Header />
            <center className="faq-header">
                <h1>Velg en <span>kategori</span> for jobben!</h1>
            </center>
            <div className="create-job-listing-container">
            {!initialSelectionMade ? (
                    <div className="initial-selection-container">
                        <br></br>
                        <div className="button-container2">
                            {selectCategories.map((category, index) => (
                                <button
                                    key={index}
                                    onMouseEnter={() => setHoverIndex(index)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                    onClick={() => handleInitialSelection(category)}
                                >
                                    <i className={category.icon} style={{ color: hoverIndex === index ? 'white' : 'var(--active-color)' }}></i>
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        
                    <div className="form-container2">
                        <button className="go-back-button" onClick={handleGoBack}>Gå tilbake</button>
                        <div className="form-header">
                            <h1 className="form-title">Lag jobboppføring for<br></br>
                                 <span>{selectedCategory}</span> oppdrag  
                            </h1>
                            <p className="form-subtitle">Skriv inn detaljene for stillingsannonsen</p>
                        </div>
                        <div className="form-body">
                        <div>
                            <label htmlFor="type" className="form-label">Type Jobb</label>
                            <input 
                                ref={typeToggleButtonRef} 
                                id="type" 
                                className="form-select" 
                                type="text" 
                                onClick={toggleTypeDropdown} 
                                value={inputValue} 
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    handleOptionClick(e.target.value, 'type');
                                }} 
                            />
                            {isTypeOpen && (
                                <ul ref={typeRef}>
                                    <h2>Eksempler på oppdrag</h2>
                                    {Object.entries(jobTypeCategoryMapping).length > 0 &&
                                    selectedCategory &&
                                    jobTypeCategoryMapping[selectedCategory]?.filter(jobType => jobType.toLowerCase().includes(inputValue.toLowerCase())).map((jobType) => (
                                        <button key={jobType} onClick={() => handleOptionClick(jobType, 'type')}>
                                        {jobType}
                                        </button>
                                    ))}
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
                                        type="button" // Changed to "button" to prevent form submission behavior
                                        onClick={handleSubmit}
                                    >
                                        Lag Jobb
                                    </button>
                                </div>
                            </div>

                        {/* The image container should be included within the conditional rendering block */}
                        <div className="image-container">
                            <div className="job-overview2">
                                <div className="job-explain2">
                                <div className="job-bg">
                                    {getImg('default')}
                                </div>
                                <div className="job-logos" onClick={handleOpenLogoModal}>
                                    {selectedLogo ? 
                                        <svg height="70">
                                            {/* Your SVG code here */}
                                            <foreignObject x="5" y="5" width="100" height="100" fontSize="1.5em">
                                                <i className={selectedLogo}></i>
                                            </foreignObject>
                                        </svg> 
                                    : 
                                        getSvg('default')
                                    }
                                </div>
                                    <LogoSelectionModal isOpen={logoModalOpen} onSelect={handleSelectLogo} onClose={handleCloseLogoModal} />
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
                                        Ditt navn
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
                                    {/*<button className="search-buttons card-buttons">
                                    Søk Nå
                                    </button>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </div>
            <NavigationBar />
        </div>
    );
}

export default Create;