import './App.css';
import { simulateTyping } from './simulateTyping';
import React, { useState, useRef, useEffect  } from 'react';
import jobsData from './jobsData';
import Header from './header';
import getSvg  from './Accesorios/getSvg';
import getImg  from './Accesorios/getImg';
import { useParams, useNavigate } from 'react-router-dom';


const JobCard = ({ job, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  }

  const hideMenu = () => {
    setShowMenu(false);
  }

  return (
    <div className="job-card" onClick={() => onClick(job)}>
      {/* Start here */}
      <div className="job-card" onMouseLeave={hideMenu}>
        <div className="job-card-header">
            {getSvg(job.svg)}
            <div className="menu-holder" onClick={toggleMenu}>
              <div className="menu-dot">
            </div>
            </div>
            {showMenu && (
              <div className="menu"  onMouseLeave={hideMenu}>
                <div className="menu-item">
                  <i className="fas fa-heart" style={{ marginRight: '8px' }}></i>
                  Favoritt
                </div>
                <div className="menu-item">
                  <i className="fas fa-flag" style={{ marginRight: '8px' }}></i>
                    Anmeld
                </div>
              </div>
            )}
        </div>
        <div className="job-card-county"><span>{job.date}</span> <br></br>{job.county}</div>
        <div className="job-card-title">{job.title}</div>
        <div className="job-card-subtitle">{job.description}</div>
        <div className="job-card-price"><br></br>{job.price} kr</div>
        <div className="job-detail-buttons">
          <button className="search-buttons detail-button">
            Små jobber
          </button>
          <button className="search-buttons detail-button">
            Null erfaring
          </button>
          <button className="search-buttons detail-button">
            Studentnivå
          </button>
          <div className="job-card-buttons">
            <button className="search-buttons card-buttons">
              Søk Nå
            </button>
          </div>
        </div>
        {/* Ends here */}
      </div>
    </div>
  );
}
  
const OverviewCard = ({ job, onClick  }) => {
  return (
    <div className="job-card overview-card" onClick={() => onClick(job)}>
      <div className="overview-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
          <rect width="100%" height="100%" fill="#fff" />
          <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff",display: "flex",justifyContent: "center",alignItems: "center"}}>
            <div
              style={{display: "flex",justifyContent: "center",alignItems: "center",height: "100%"}}>
              {getSvg(job.svg)}
            </div>
          </foreignObject>
        </svg>
        <div className="overview-detail">
          <div className="job-card-title">{job.title}</div>
          <div className="job-card-subtitle">{job.county}, {job.postalCode}</div>
        </div>
        <svg className="heart" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor" strokeWidth={2}strokeLinecap="round"strokeLinejoin="round">
          <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
        </svg>
      </div>
      <div className="job-overview-buttons">
        <div className="search-buttons time-button">
          (Ansettelsestype)
        </div>
        <div className="search-buttons level-button">
          (Ansiennitetsnivå)
        </div>
        <div className="job-stat">Ny</div>
        <div className="job-day">1d</div>
      </div>
    </div>
  );
};

const JobDetailView = ({ job, onOverviewClick, onClose, selectedLocation }) => {
    if (!job) return null;

    return (
      <div className="job-overview">
        <div className="job-overview-cards">
        <button className="job-overview-close" id="hide" onClick={onClose}>Tilbake</button>
          <div className="job-overview-card">
          {jobsData
            .filter(job => selectedLocation === '' || job.county === selectedLocation)
            .map(filteredJob => (
              <OverviewCard key={filteredJob.id} job={filteredJob} onClick={() => onOverviewClick(filteredJob)} />
          ))}
          </div>
        </div>
        <div className="job-explain">
        <button className="job-overview-close" id="show" onClick={onClose}>Tilbake</button>
          <div className="job-bg">
            {getImg(job.img)}
          </div>
          <div className="job-logos">
            {getSvg(job.svg)}
          </div>
          <div className="job-explain-content">
            <div className="job-title-wrapper">
              <div className="job-card-title">{job.title}</div>
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
                <span className="comp-location">{job.county}, {job.postalCode}</span>
              </div>
              <div className="posted">
                Lagt ut for ANTALL dag(er) siden
                <span className="app-number">0 applikasjoner</span>
              </div>
            </div>
            <div className="explain-bar">
              <div className="explain-contents">
                <div className="explain-title">Erfaring</div>
                <div className="explain-subtitle">(Erfaring)</div>
              </div>
              <div className="explain-contents">
                <div className="explain-title">Type ansatt</div>
                <div className="explain-subtitle">(Ansiennitetsnivå)</div>
              </div>
              <div className="explain-contents">
                <div className="explain-title">Ansettelsestype</div>
                <div className="explain-subtitle">(Ansettelsestype)</div>
              </div>
              <div className="explain-contents">
                <div className="explain-title">Tilby lønn</div>
                <div className="explain-subtitle">{job.price}</div>
              </div>
            </div>
            <div className="overview-text">
              <div className="overview-text-header">Oversikt</div>
              <div className="overview-text-subheader">
                (Ren tekst beskrivelse her)
              </div>
            </div>
            <div className="overview-text">
              <div className="overview-text-header">
                Stillingsbeskrivelse
              </div>
              <div className="overview-text-item">Tilleggsinfo</div>
              <br></br>
            </div>
            <button className="search-buttons card-buttons">
              Søk Nå
            </button>
          </div>
        </div>
      </div>
    );
  };


  const countJobsByCounty = (jobs) => {
    return jobs.reduce((acc, job) => {
      acc[job.county] = (acc[job.county] || 0) + 1;
      return acc;
    }, {});
  };

  const countJobsByPrice = (jobs) => {
    return jobs.reduce((acc, job) => {
      acc[job.price] = (acc[job.price] || 0) + 1;
      return acc;
    }, {});
  }

function Home() {

    
    const [theme, setTheme] = useState(localStorage.getItem('theme') || '');
    const wrapperRef = useRef(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showLocations, setShowLocations] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedAnsettelsestype, setSelectedAnsettelsestype] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [jobFilter, setJobFilter] = useState('');
    const inputRef = useRef(null);
    const categories = [
        'Barnepass', 'Gressklipping', 'Løvrydding', 'Snømåking', 'Hundelufting', 'Vaske biler', 'Selge produkter', 
        'Lekerengjøring', 'Plantepleie', 'Bake og selge kaker', 'Hjemmeorganisering', 'Hente posten', 'Babysitting',
        'Male gjerder' , 'Småreparasjoner', 'Levere aviser', 'Organisere garasjesalg', 'Datatjenester for eldre',
        'Hjelpe med hagearbeid', 'Vannplanter for naboer', 'Hjelpe til med å flytte'
    ];
    const navigate = useNavigate();
    const { jobId } = useParams();

    const handleOverviewClick = (job) => {
      setSelectedJob(job);
      navigate(`/${job.id}`);
  };

  const handleLocationSelection = (location, event) => {
    if (selectedLocation === location) {
      setSelectedLocation('');
      event.currentTarget.checked = false;
    } else {
      setSelectedLocation(location);
    }
  };  

  const handleAsettelsestypeSelection = (ansettelsestype, event) => {
    if (selectedAnsettelsestype = ansettelsestype) {
      setSelectedAnsettelsestype('');
      event.currentTarget.checked = false;
    } else {
      setSelectedAnsettelsestype(ansettelsestype);
    }
  }

  const handlePriceSelection = (price, event) => {
    if (selectedPrice = price) {
      setSelectedPrice('');
      event.currentTarget.checked = false;
    } else {
      setSelectedPrice(price);
    }
  }

    const handleJobClick = (job) => {
      navigate(`/${job.id}`);
    };

    const closeJobDetailView = () => {
      setSelectedJob(null);
      navigate('/');
  };

    const handleCategorySelection = (categoryName) => {
        setJobFilter(categoryName);
        simulateTyping(inputRef, categoryName);
    };

    // Filter categories based on input
    const filteredCategories = categories.filter(category => 
        category.toLowerCase().includes(jobFilter.toLowerCase())
    );

    const toggleLocations = () => {
        setShowLocations(!showLocations);
    };

    // State to hold the number of jobs
    const [jobCount, setJobCount] = useState(0);

    const [jobCounts, setJobCounts] = useState({});

    // Effect to update the job count when the component mounts
    useEffect(() => {
        setJobCount(jobsData.length);
        setJobCounts(countJobsByCounty(jobsData));
        setJobCounts(countJobsByPrice(jobsData));
    }, [jobsData]);

    useEffect(() => {
      if (jobId) {
        const jobDetail = jobsData.find(job => job.id === parseInt(jobId, 10));
        if (jobDetail) {
          setSelectedJob(jobDetail);
        } else {
          // Handle case where job is not found
          navigate('/'); // Redirect to home if job ID is invalid
        }
      }
    }, [jobId, navigate]);

    useEffect(() => {
      // Update job count based on selected location
      const filteredJobs = jobsData.filter(job => 
          selectedLocation === '' || job.county === selectedLocation,
      );
      setJobCount(filteredJobs.length);
  }, [selectedLocation]); // Dependency array includes selectedLocation

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
          <Header onClose={closeJobDetailView}/>
            <div className="categories">
              <div className="category">
                <div className="category-menu">
                  <div className="category-menu">
                    <div className="category-item">
                      <i className="fas fa-baby" style={{ color: "#ffae00" }} />{" "}
                      Barnepass
                    </div>
                    <div className="category-item">
                      <i className="fas fa-leaf" style={{ color: "#ffae00" }} />{" "}
                      Gressklipping
                    </div>
                    <div className="category-item">
                      <i className="fas fa-wind" style={{ color: "#ffae00" }} />{" "}
                      Løvrydding
                    </div>
                    <div className="category-item">
                      <i className="fas fa-snowflake" style={{ color: "#ffae00" }} />{" "}
                      Snømåking
                    </div>
                    <div className="category-item">
                      <i className="fas fa-dog" style={{ color: "#ffae00" }} />{" "}
                      Hundelufting
                    </div>
                    <div className="category-item">
                      <i className="fas fa-car" style={{ color: "#ffae00" }} /> Vaske
                      biler
                    </div>
                    <div className="category-item">
                      <i className="fas fa-cookie-bite" style={{ color: "#ffae00" }} />{" "}
                      Selge produkter
                    </div>
                    <div className="category-item">
                      <i className="fas fa-broom" style={{ color: "#ffae00" }} />{" "}
                      Lekerengjøring
                    </div>
                    <div className="category-item">
                      <i className="fas fa-seedling" style={{ color: "#ffae00" }} />{" "}
                      Plantepleie
                    </div>
                    <div className="category-item">
                      <i
                        className="fas fa-birthday-cake"
                        style={{ color: "#ffae00" }}
                      />{" "}
                      Bake og selge kaker
                    </div>
                    <div className="category-item">
                      <i className="fas fa-home" style={{ color: "#ffae00" }} />{" "}
                      Hjemmeorganisering
                    </div>
                    <div className="category-item">
                      <i className="fas fa-mail-bulk" style={{ color: "#ffae00" }} />
                      Hente posten
                    </div>
                    <div className="category-item">
                      <i
                        className="fas fa-baby-carriage"
                        style={{ color: "#ffae00" }}
                      />{" "}
                      Babysitting
                    </div>
                    <div className="category-item">
                      <i className="fas fa-paint-roller" style={{ color: "#ffae00" }} />{" "}
                      Male gjerder
                    </div>
                    <div className="category-item">
                      <i className="fas fa-tools" style={{ color: "#ffae00" }} />
                      Småreparasjoner
                    </div>
                    <div className="category-item">
                      <i className="fas fa-newspaper" style={{ color: "#ffae00" }} />{" "}
                      Levere aviser
                    </div>
                    <div className="category-item">
                      <i className="fas fa-tags" style={{ color: "#ffae00" }} />{" "}
                      Organisere garasjesalg
                    </div>
                    <div className="category-item">
                      <i className="fas fa-laptop" style={{ color: "#ffae00" }} />
                      Datatjenester for eldre
                    </div>
                    <div className="category-item">
                      <i className="fas fa-seedling" style={{ color: "#ffae00" }} />{" "}
                      Hjelpe med hagearbeid
                    </div>
                    <div className="category-item">
                      <i className="fas fa-tint" style={{ color: "#ffae00" }} />{" "}
                      Vannplanter for naboer
                    </div>
                    <div className="category-item">
                      <i className="fas fa-truck" style={{ color: "#ffae00" }} /> Hjelpe
                      til med å flytte
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`wrapper ${theme}`} ref={wrapperRef}>
              <div className="search-menu">
                {/*<div className="search-bar">
                  <div id="Color">
                    <span className="full-text">Velg en kategori ↑</span>
                    <span className="short-text">Velg ↑</span>
                  </div>
                  <div className="search item">
                    Gressklipping
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </div>
                </div>*/}
                <div className="search-location" onClick={toggleLocations}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                    <span className="placeholder"> Fylke</span>
                  <i className="fas fa-chevron-down" style={{ position: "absolute", right: 10 }} />
                {showLocations && (
                  <div className="other-locations">
                    {/*<p className="selected-location">Velg Fylke</p>*/}
                    <p>Agder</p>
                    <p>Innlandet</p>
                    <p>Møre og Romsdal</p>
                    <p>Nordland</p>
                    <p>Oslo</p>
                    <p>Rogaland</p>
                    <p>Svalbard</p>
                    <p>Troms og Finnmark</p>
                    <p>Trøndelag</p>
                    <p>Vestfold og Telemark</p>
                    <p>Vestland</p>
                    <p>Viken</p>
                  </div>
                  )}
                </div>
                <div className="search-job">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-briefcase"
                  >
                    <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                  </svg>
                  <div className="search-categories">
                    <input 
                      ref={inputRef}
                      type="text"
                      id="search-input"
                      placeholder="Type job"
                      onChange={e => setJobFilter(e.target.value)}
                    />
                    <div className="Categories-nav">
                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => (
                          <p key={index} onClick={() => handleCategorySelection(category)}>{category}</p>
                        ))
                      ) : (
                        <p>Ingen kategorier funnet.</p>
                      )}
                    </div>
                  </div>
                </div>
                 {/*<div className="search-salary">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth=".4"
                  >
                    <path
                      d="M12.6 18H9.8a.8.8 0 010-1.5h2.8a.9.9 0 000-1.8h-1.2a2.4 2.4 0 010-4.7h2.8a.8.8 0 010 1.5h-2.8a.9.9 0 000 1.8h1.2a2.4 2.4 0 010 4.7z"
                      stroke="currentColor"
                    />
                    <path
                      d="M12 20a.8.8 0 01-.8-.8v-2a.8.8 0 011.6 0v2c0 .5-.4.8-.8.8zM12 11.5a.8.8 0 01-.8-.8v-2a.8.8 0 011.6 0v2c0 .5-.4.8-.8.8z"
                      stroke="currentColor"
                    />
                    <path
                      d="M21.3 23H2.6A2.8 2.8 0 010 20.2V3.9C0 2.1 1.2 1 2.8 1h18.4C22.9 1 24 2.2 24 3.8v16.4c0 1.6-1.2 2.8-2.8 2.8zM2.6 2.5c-.6 0-1.2.6-1.2 1.3v16.4c0 .7.6 1.3 1.3 1.3h18.4c.7 0 1.3-.6 1.3-1.3V3.9c0-.7-.6-1.3-1.3-1.3z"
                      stroke="currentColor"
                    />
                    <path
                      d="M23.3 6H.6a.8.8 0 010-1.5h22.6a.8.8 0 010 1.5z"
                      stroke="currentColor"
                    />
                  </svg>
                  <input type="text" placeholder="Lønnsområde" />
                </div>*/}
                <button className="search-button">Finn Jobb</button>
              </div>
              <div className="main-container">
                  <div className="search-type">
                  <div className="job-time">
                    <div className="job-time">
                      <p>Område i kart</p>
                      <input
                        id="search-box"
                        type="text"
                        placeholder="Søk etter sted eller postnummer"
                      />
                      <div id="map" />
                    </div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243492.267531465!2d8.46894576840826!3d60.47202389999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46110e5b1a4a57e7%3A0x3624d96eae8f78f1!2sNorway!5e0!3m2!1sen!2s!4v1633965196208!5m2!1sen!2s"
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </div>
                  <div className="job-time">
                    <div className="job-time-title">Område</div>
                    <div className="job-wrapper">
                      <div className="type-container">
                        <input type="radio" name="location" id="job1" className="job-style" onClick={(e) => handleLocationSelection('Agder', e)}/>
                        <label htmlFor="job1">Agder</label>
                        <span className="job-number">{jobCounts['Agder'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job2" className="job-style" onClick={(e) => handleLocationSelection('Innlandet', e)}/>
                        <label htmlFor="job2">Innlandet</label>
                        <span className="job-number">{jobCounts['Innlandet'] || 0}</span>
                      </div>
                      <div className="type-container">
                      <input type="radio" name="location" id="job3" className="job-style" onClick={(e) => handleLocationSelection('Møre og Romsdal', e)}/>
                        <label htmlFor="job3">Møre og Romsdal</label>
                        <span className="job-number">{jobCounts['Møre og Romsdal'] || 0}</span>
                      </div>
                      <div className="type-container">
                      <input type="radio" name="location" id="job4" className="job-style" onClick={(e) => handleLocationSelection('Nordland', e)}/>
                        <label htmlFor="job4">Nordland</label>
                        <span className="job-number">{jobCounts['Nordland'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job5" className="job-style" onClick={(e) => handleLocationSelection('Oslo', e)}/>
                        <label htmlFor="job5">Oslo</label>
                        <span className="job-number">{jobCounts['Oslo'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job6" className="job-style" onClick={(e) => handleLocationSelection('Rogaland', e)}/>
                        <label htmlFor="job6">Rogaland</label>
                        <span className="job-number">{jobCounts['Rogaland'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job7" className="job-style" onClick={(e) => handleLocationSelection('Svalbard', e)}/>
                        <label htmlFor="job7">Svalbard</label>
                        <span className="job-number">{jobCounts['Svalbard'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job8" className="job-style" onClick={(e) => handleLocationSelection('Troms og Finnmark', e)}/>
                        <label htmlFor="job8">Troms og Finnmark</label>
                        <span className="job-number">{jobCounts['Troms og Finnmark'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job9" className="job-style" onClick={(e) => handleLocationSelection('Trøndelag', e)}/>
                        <label htmlFor="job9">Trøndelag</label>
                        <span className="job-number">{jobCounts['Trøndelag'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job10" className="job-style" onClick={(e) => handleLocationSelection('Vestfold og Telemark', e)}/>
                        <label htmlFor="job10">Vestfold og Telemark</label>
                        <span className="job-number">{jobCounts['Vestfold og Telemark'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job11" className="job-style" onClick={(e) => handleLocationSelection('Vestland', e)}/>
                        <label htmlFor="job11">Vestland</label>
                        <span className="job-number">{jobCounts['Vestland'] || 0}</span>
                      </div>
                      <div className="type-container">
                        <input type="radio" name="location" id="job12" className="job-style" onClick={(e) => handleLocationSelection('Viken', e)}/>
                        <label htmlFor="job12">Viken</label>
                        <span className="job-number">{jobCounts['Viken'] || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-time">
                    <div className="job-time-title">Ansettelsestype</div>
                    <div className="job-wrapper">
                      <div className="type-container">
                        <input type="checkbox" id="job13" className="job-style" onClick={(e) => handleAsettelsestypeSelection('Heltidsjobber', e)}/>
                        <label htmlFor="job13">Heltidsjobber</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job14" className="job-style" onClick={(e) => handleAsettelsestypeSelection('Deltidsjobber', e)}/>
                        <label htmlFor="job14">Deltidsjobber</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job15" className="job-style" onClick={(e) => handleAsettelsestypeSelection('Eksterne jobber', e)}/>
                        <label htmlFor="job15">Eksterne jobber</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job16" className="job-style" onClick={(e) => handleAsettelsestypeSelection('Kontrakt', e)}/>
                        <label htmlFor="job16">Kontrakt</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job17" className="job-style" onClick={(e) => handleAsettelsestypeSelection('Små jobber', e)}/>
                        <label htmlFor="job17">Små jobber</label>
                        <span className="job-number">1</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-time">
                    <div className="job-time-title">Ansiennitetsnivå</div>
                    <div className="job-wrapper">
                      <div className="type-container">
                        <input
                          type="checkbox"
                          id="job18"
                          className="job-style"
                          defaultChecked=""
                        />
                        <label htmlFor="job18">Studentnivå</label>
                        <span className="job-number">1</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job19" className="job-style" />
                        <label htmlFor="job19">Inngangsnivå</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job20" className="job-style" />
                        <label htmlFor="job20">Midtnivå</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job21" className="job-style" />
                        <label htmlFor="job21">Seniornivå</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job22" className="job-style" />
                        <label htmlFor="job22">Regissører</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job23" className="job-style" />
                        <label htmlFor="job23">VP eller over</label>
                        <span className="job-number">0</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-time">
                    <div className="job-time-title">Lønnsområde</div>
                    <div className="job-wrapper">
                      <div className="type-container">
                        <input type="checkbox" id="job24" className="job-style" onClick={(e) => handlePriceSelection('0kr - 100kr', e)}/>
                        <label htmlFor="job24">0kr - 100kr</label>
                        <span className="job-number">1</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job25" className="job-style" onClick={(e) => handlePriceSelection('100kr - 200kr', e)}/>
                        <label htmlFor="job25">100kr - 200kr</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job26" className="job-style" onClick={(e) => handlePriceSelection('200kr - 500kr', e)}/>
                        <label htmlFor="job26">200kr - 500kr</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job27" className="job-style" onClick={(e) => handlePriceSelection('500kr - 1500kr', e)}/>
                        <label htmlFor="job27">500kr - 1500kr</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job28" className="job-style" onClick={(e) => handlePriceSelection('1500kr - 3000kr', e)}/>
                        <label htmlFor="job28">1500kr - 3000kr</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job29" className="job-style" onClick={(e) => handlePriceSelection('3000kr - 4000kr', e)}/>
                        <label htmlFor="job29">3000kr - 4000kr</label>
                        <span className="job-number">0</span>
                      </div>
                      <div className="type-container">
                        <input type="checkbox" id="job30" className="job-style" onClick={(e) => handlePriceSelection('4000kr - 9999kr', e)}/>
                        <label htmlFor="job30">4000kr - 9999kr</label>
                        <span className="job-number">0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="searched-jobs">
                  <div className={`searched-bar ${selectedJob ? "hide-searched-bar" : ""}`}>
                    <div className="searched-show">Viser {jobCount} jobber</div>
                      <div className="searched-sort">
                        Sorter etter: <span className="post-time">Nyeste Post </span>
                        <span className="menu-icon">▼</span>
                      </div>
                  </div>
                  <div className="job-cards">
                  {selectedJob == null && jobsData
                    .filter(job => selectedLocation === '' || job.county === selectedLocation)
                    .map(job => (
                      <JobCard key={job.id} job={job} onClick={handleJobClick} />
                  ))}
                  </div>
                  {selectedJob && (
                    <JobDetailView 
                        job={selectedJob} 
                        onOverviewClick={handleOverviewClick} 
                        onClose={closeJobDetailView} 
                        selectedLocation={selectedLocation}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

    );
}

export default Home;
