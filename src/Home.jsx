import './App.css';
import { simulateTyping } from './simulateTyping';
import React, { useState, useRef, useEffect  } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from './firebaseConfig'; 
import jobsData from './jobsData';
import Header from './header';
import getSvg  from './Accesorios/getSvg';
import getImg  from './Accesorios/getImg';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { selectCategories } from './selectCategories';

const renderLogo = (logo) => {
  switch(logo) {
    case 'fas fa-child':
      return (
        <div className="custom-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-baby-carriage" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
        </div>
      );
    // Other cases for different logos
    default:
      // Return the default logo representation or null if none
      return null;
  }
};

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
          {renderLogo(job.logo)}
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
        <div className="job-card-county"><span>ny</span> <br></br>{job.fylke}</div>
        <div className="job-card-title">{job.typeJobb}</div>
        <div className="job-card-subtitle">
          {job.beskrivelse?.length > 30 
            ? `${job.beskrivelse.substring(0, 30)}...` 
            : job.beskrivelse ?? 'Ingen beskrivelse'}
        </div>
        <div className="job-card-price"><br></br>{job.pris} kr</div>
        <div className="job-detail-buttons">
          <button className="search-buttons detail-button">
            {job.erfaring}
          </button>
          <button className="search-buttons detail-button">
            {job.ansettelsestype}
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
              {renderLogo(job.logo)}
            </div>
          </foreignObject>
        </svg>
        <div className="overview-detail">
          <div className="job-card-title">{job.typeJobb}</div>
          <div className="job-card-subtitle">{job.fylke}, {job.postnummer}</div>
        </div>
        <svg className="heart" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"fill="none"stroke="currentColor" strokeWidth={2}strokeLinecap="round"strokeLinejoin="round">
          <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
        </svg>
      </div>
      <div className="job-overview-buttons">
        <div className="search-buttons time-button">
          {job.ansettelsestype}
        </div>
        <div className="search-buttons level-button">
          {job.erfaring}
        </div>
        <div className="job-stat">Ny</div>
        <div className="job-day">1d</div>
      </div>
    </div>
  );
};

export const JobDetailView = ({ job, jobs, onOverviewClick, onClose, selectedLocation }) => {

    return (
      <div className="job-overview">
        <div className="job-overview-cards">
        <button className="job-overview-close" id="hide" onClick={onClose}>Tilbake</button>
          <div className="job-overview-card">
          {jobs
            .filter(job => selectedLocation === '' || job.fylke === selectedLocation)
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
            {renderLogo(job.logo)}
          </div>
          <div className="job-explain-content">
            <div className="job-title-wrapper">
              <div className="job-card-title">{job.typeJobb}</div>
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
                {job.userName}
                <span className="comp-location">{job.fylke}, {job.postnummer}</span>
              </div>
              <div className="posted">
                Lagt ut for ANTALL dag(er) siden
                <span className="app-number">0 applikasjoner</span>
              </div>
            </div>
            <div className="explain-bar">
              <div className="explain-contents">
                <div className="explain-title">Type ansatt</div>
                <div className="explain-subtitle">{job.erfaring}</div>
              </div>
              <div className="explain-contents">
                <div className="explain-title">Ansettelsestype</div>
                <div className="explain-subtitle">{job.ansettelsestype}</div>
              </div>
              <div className="explain-contents">
                <div className="explain-title">Arbeidstid</div>
                <div className="explain-subtitle">{job.arbeidstid}</div>
              </div>
              <div className="explain-contents">
                <div className="explain-title">Tilby lønn</div>
                <div className="explain-subtitle">{job.pris}</div>
              </div>
            </div>
            <div className="overview-text">
              <div className="overview-text-header">Oversikt</div>
              <div className="overview-text-subheader">
                {job.beskrivelse}
              </div>
            </div>
            <div className="overview-text">
              <div className="overview-text-header">
                Stillingsbeskrivelse
              </div>
              <div className="overview-text-item">{job.tilleggsinfo}</div>
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
      acc[job.fylke] = (acc[job.fylke] || 0) + 1;
      return acc;
    }, {});
  };

function Home() {

    
    const [theme ] = useState(localStorage.getItem('theme') || '');
    const wrapperRef = useRef(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showLocations, setShowLocations] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
    const [selectedSeniorityLevels, setSelectedSeniorityLevels] = useState([]);
    const [jobFilter, setJobFilter] = useState('');
    const [jobs, setJobs] = useState([]);
    const [users, setUsers] = useState({});
    const inputRef = useRef(null);
    const categories = [
        'Barnepass', 'Gressklipping', 'Løvrydding', 'Snømåking', 'Hundelufting', 'Vaske biler', 'Selge produkter', 
        'Lekerengjøring', 'Plantepleie', 'Bake og selge kaker', 'Hjemmeorganisering', 'Hente posten', 'Babysitting',
        'Male gjerder' , 'Småreparasjoner', 'Levere aviser', 'Organisere garasjesalg', 'Datatjenester for eldre',
        'Hjelpe med hagearbeid', 'Vannplanter for naboer', 'Hjelpe til med å flytte'
    ];
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); // Adjust max according to your needs

    const [employmentTypeCounts, setEmploymentTypeCounts] = useState({});
    const [seniorityLevelCounts, setSeniorityLevelCounts] = useState({});

    useEffect(() => {
      setEmploymentTypeCounts(countJobsByEmploymentType(jobs));
      setSeniorityLevelCounts(countJobsBySeniorityLevel(jobs));
    }, [jobs]);

    useEffect(() => {
      const jobsRef = ref(database, 'jobs');
      onValue(jobsRef, (snapshot) => {
        const data = snapshot.val();
        const loadedJobs = [];
        for (const userId in data) {
          for (const jobId in data[userId]) {
            // Here we check if the user's name is available in the users state before adding it
            const userName = users[userId] || 'Unknown User'; // Fallback to 'Unknown User' if not found
            loadedJobs.push({
              id: jobId,
              ...data[userId][jobId],
              userName: userName // Add the userName to the job object
            });
          }
        }
        setJobs(loadedJobs);
      });
      // Include users in the dependency array so this effect runs again when users state updates
    }, [users]);
    
    useEffect(() => {
      const jobRef = ref(database, 'jobs');
      onValue(jobRef, (snapshot) => {
        let jobFound = false;
        snapshot.forEach(userSnapshot => {
          const userJobs = userSnapshot.val();
          const userJob = userJobs[jobId];
          if (userJob) {
            jobFound = true;
            setSelectedJob({
              id: jobId,
              ...userJob,
            });
          }
        });
    
        if (!jobFound) {
          console.log("Job not found");
          // Optionally redirect to home or show an error
          // navigate('/');
        }
      });
    }, [jobId, database]);
    
    

    useEffect(() => {
      const usersRef = ref(database, 'users');
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const loadedUsers = {};
        for (const userId in data) {
          // Concatenate name and surname here
          loadedUsers[userId] = `${data[userId].name} ${data[userId].surname}`; 
        }
        setUsers(loadedUsers);
      });
    }, []);
    
    

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

  const handleEmploymentTypeSelection = (employmentType) => {
    setSelectedEmploymentTypes(prev => {
      if (prev.includes(employmentType)) {
        return prev.filter(type => type !== employmentType);
      } else {
        return [...prev, employmentType];
      }
    });
  };
  
  const handleSeniorityLevelSelection = (seniorityLevel) => {
    setSelectedSeniorityLevels(prev => {
      if (prev.includes(seniorityLevel)) {
        return prev.filter(level => level !== seniorityLevel);
      } else {
        return [...prev, seniorityLevel];
      }
    });
  };
  

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

    const countJobsByEmploymentType = (jobs) => {
      return jobs.reduce((acc, job) => {
        const type = job.ansettelsestype; // Assuming 'ansettelsestype' is the correct field for employment type
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
    };
    
    const countJobsBySeniorityLevel = (jobs) => {
      return jobs.reduce((acc, job) => {
        const level = job.erfaring; // Assuming 'Ansiennitetsnivå' is the field for seniority level
        if(level) { // Check if the job has a seniority level defined
          acc[level] = (acc[level] || 0) + 1;
        }
        return acc;
      }, {});
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
        setJobCount(jobs.length);
        setJobCounts(countJobsByCounty(jobs));
    }, [jobs]);

    
    
    

    // Update the filteredJobs state whenever the selectedLocation or priceRange changes
    useEffect(() => {
      const updatedFilteredJobs = jobs.filter(job => {
        // Convert job.pris to a number after removing all non-digit characters
        const jobPrisString = (typeof job.pris === 'string') ? job.pris : '';
        const jobPrisNumber = Number(jobPrisString.replace(/\D/g, '')) || 0;
        
        // Filter based on the price range
        const matchesPrice = priceRange.max > 1 ? jobPrisNumber <= priceRange.max : true;
        
        return matchesPrice;
      });
    
      setFilteredJobs(updatedFilteredJobs);
      setJobCount(updatedFilteredJobs.length); // Update job count based on filtered jobs
    }, [priceRange, jobs]);
    
    
    
    
    useEffect(() => {
      // Filter jobs based on all selected criteria except for the criteria of the category being counted
      const filterJobs = (excludeCategory) => {
        return jobs.filter(job => {
          const matchesLocation = excludeCategory !== 'Fylke' ? (!selectedLocation || job.county === selectedLocation) : true;
          const matchesEmploymentType = excludeCategory !== 'Ansettelsestype' ? (!selectedEmploymentTypes.length || selectedEmploymentTypes.includes(job.ansettelsestype)) : true;
          const matchesSeniorityLevel = excludeCategory !== 'Ansiennitetsnivå' ? (!selectedSeniorityLevels.length || selectedSeniorityLevels.includes(job.erfaring)) : true;
          return matchesLocation && matchesEmploymentType && matchesSeniorityLevel;
        });
      };
    
      // Update employment type counts without considering current employment type selections
      const newEmploymentTypeCounts = countJobsByEmploymentType(filterJobs('Ansettelsestype'));
      setEmploymentTypeCounts(newEmploymentTypeCounts);
    
      // Update seniority level counts without considering current seniority level selections
      const newSeniorityLevelCounts = countJobsBySeniorityLevel(filterJobs('Ansiennitetsnivå'));
      setSeniorityLevelCounts(newSeniorityLevelCounts);
    
      // Update Fylke counts without considering current Fylke selections
      const newCountyCounts = countJobsByCounty(filterJobs('Fylke'));
      setJobCounts(newCountyCounts);
    
      // Apply all filters for displaying jobs
      const filteredJobs = filterJobs(null); // Apply all filters
      setFilteredJobs(filteredJobs);
      setJobCount(filteredJobs.length);
    }, [selectedLocation, selectedEmploymentTypes, selectedSeniorityLevels, jobs]);
    

    useEffect(() => {
      const updatedFilteredJobs = jobs.filter(job => {
        // Ensure job.pris is a string before trying to replace non-digits
        const jobPris = job.pris && typeof job.pris === 'string' ? Number(job.pris.replace(/\D/g, '')) : 0;
        
        const matchesPrice = !priceRange.max || jobPris <= priceRange.max;
        const matchesLocation = !selectedLocation || job.fylke === selectedLocation;
        const matchesEmploymentType = !selectedEmploymentTypes.length || selectedEmploymentTypes.includes(job.ansettelsestype);
        const matchesSeniorityLevel = !selectedSeniorityLevels.length || selectedSeniorityLevels.includes(job.erfaring);
        
        return matchesPrice && matchesLocation && matchesEmploymentType && matchesSeniorityLevel;
      });
    
      setFilteredJobs(updatedFilteredJobs);
      setJobCount(updatedFilteredJobs.length);
    }, [selectedLocation, priceRange, jobs, selectedEmploymentTypes, selectedSeniorityLevels]);
    
    

  useEffect(() => {
    // Apply the overflow: hidden; style to the body when the component is mounted
    document.body.style.overflow = 'hidden';

    // Remove the overflow: hidden; style from the body when the component is unmounted
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className="container">
          <Header onClose={closeJobDetailView}/>
            <div className={`wrapper ${theme}`} ref={wrapperRef}>
            <div className="select-category">
              <div className="category-wrapper">
            {selectCategories.map((category, index) => (
              <p
                key={index}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{ 
                  backgroundColor: hoverIndex === index ? 'var(--level-button)' : 'var(--alert-bg-color)',
                  color: hoverIndex === index ? 'var(--body-color)' : 'inherit', // Change text color on hover
                }}
              >
                <i className={category.icon} style={{ color: hoverIndex === index ? 'white' : 'var(--active-color)' }}></i>
                <span style={{
                  textDecorationColor: hoverIndex === index && theme !== 'dark-mode' ? 'white' : 'var(--active-color)'
                }}>
                  {category.label}
                </span>
                <br /> {category.sublabel}
              </p>
            ))}
            </div>
          </div>
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
              {/*
              <div className="search-location" onClick={toggleLocations}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
                  <span className="placeholder"> Kategori</span>
                <i className="fas fa-chevron-down" style={{ position: "absolute", right: 10 }} />
              {showLocations && (
                <div className="other-locations">
                  <p>Uteoppdrag</p>
                  <p>Inneoppdrag</p>
                  <p>Kreative Oppdrag</p>
                  <p>Læringsoppdrag</p>
                  <p>Vitenskapsoppdrag</p>
                  <p>Miljøoppdrag</p>
                  <p>Sosiale Oppdrag</p>
                </div>
              )}
              </div>*/}
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
                    placeholder="Søk spesifikk jobb..."
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
                <button className="search-button">Finn Jobb</button>
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
              
            </div>
            <div className="main-container">
                <div className="search-type">
                <div className="job-time" id="background-change">
                  <div className="job-time-title">Lønnsområde</div>
                  <div className="slider-container">
                    <input 
                      id='range-min'
                      type="range" 
                      min="1" 
                      max="1000" // Adjust according to your needs
                      value={priceRange.max} 
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })} 
                      className="slider" 
                    />
                    <span className="slider-value">
                      {priceRange.max === 1000 ? 'Alle prisklasser' : `${priceRange.max} kr`}
                    </span>
                  </div>
                </div>
                <div className="job-time">
                  <div className="job-time-title">Fylke</div>
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
                  {/*<div className="job-time">
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
                  />*/}
                </div>
                <div className="job-time">
                  <div className="job-time-title">Ansettelsestype</div>
                  <div className="job-wrapper">
                    <div className="type-container">
                      <input type="checkbox" id="job13" className="job-style" checked={selectedEmploymentTypes.includes("Heltidsjobber")} onChange={() => handleEmploymentTypeSelection("Heltidsjobber")}/>
                      <label htmlFor="job13">Heltidsjobber</label>
                      <span className="job-number">{employmentTypeCounts["Heltidsjobber"] || 0}</span>
                    </div>
                    <div className="type-container">
                      <input type="checkbox" id="job14" className="job-style" checked={selectedEmploymentTypes.includes("Deltidsjobber")} onChange={() => handleEmploymentTypeSelection("Deltidsjobber")}/>
                      <label htmlFor="job14">Deltidsjobber</label>
                      <span className="job-number">{employmentTypeCounts["Deltidsjobber"] || 0}</span>
                    </div>
                    <div className="type-container">
                      <input type="checkbox" id="job15" className="job-style" checked={selectedEmploymentTypes.includes("Eksterne jobber")} onChange={() => handleEmploymentTypeSelection("Eksterne jobber")}/>
                      <label htmlFor="job15">Eksterne jobber</label>
                      <span className="job-number">{employmentTypeCounts["Eksterne jobber"] || 0}</span>
                    </div>
                    <div className="type-container">
                      <input type="checkbox" id="job16" className="job-style" checked={selectedEmploymentTypes.includes("Kontrakt")} onChange={() => handleEmploymentTypeSelection("Kontrakt")}/>
                      <label htmlFor="job16">Kontrakt</label>
                      <span className="job-number">{employmentTypeCounts["Kontrakt"] || 0}</span>
                    </div>
                    <div className="type-container">
                      <input type="checkbox" id="job17" className="job-style" checked={selectedEmploymentTypes.includes("Små jobber")} onChange={() => handleEmploymentTypeSelection("Små jobber")}/>
                      <label htmlFor="job17">Små jobber</label>
                      <span className="job-number">{employmentTypeCounts["Små jobber"] || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="job-time">
                  <div className="job-time-title">Ansiennitetsnivå</div>
                  <div className="job-wrapper">
                    <div className="type-container">
                      <input type="checkbox" id="job18" className="job-style" checked={selectedSeniorityLevels.includes("Studentnivå")} onChange={() => handleSeniorityLevelSelection("Studentnivå")}/>
                      <label htmlFor="job18">Studentnivå</label>
                      <span className="job-number">{seniorityLevelCounts["Studentnivå"] || 0}</span>
                    </div>
                    <div className="type-container">
                      <input type="checkbox" id="job19" className="job-style" checked={selectedSeniorityLevels.includes("Inngangsnivå")} onChange={() => handleSeniorityLevelSelection("Inngangsnivå")}/>
                      <label htmlFor="job19">Inngangsnivå</label>
                      <span className="job-number">{seniorityLevelCounts["Inngangsnivå"] || 0}</span>
                    </div>
                    <div className="type-container">
                      <input type="checkbox" id="job20" className="job-style" checked={selectedSeniorityLevels.includes("Midtnivå")} onChange={() => handleSeniorityLevelSelection("Midtnivå")}/>
                      <label htmlFor="job20">Midtnivå</label>
                      <span className="job-number">{seniorityLevelCounts["Midtnivå"] || 0}</span>
                    </div>
                    <div className="type-container">
                      <input type="checkbox" id="job21" className="job-style" checked={selectedSeniorityLevels.includes("Seniornivå")} onChange={() => handleSeniorityLevelSelection("Seniornivå")}/>
                      <label htmlFor="job21">Seniornivå</label>
                      <span className="job-number">{seniorityLevelCounts["Seniornivå"] || 0}</span>
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
                  {selectedJob == null && filteredJobs
                    .filter(job => selectedLocation === '' || job.fylke === selectedLocation)
                    .map(job => (
                      <JobCard key={job.id} job={job} onClick={handleJobClick} />
                  ))}
                </div>
                {selectedJob && (
                  <JobDetailView 
                      job={selectedJob} 
                      jobs={jobs}
                      onOverviewClick={handleOverviewClick} 
                      onClose={closeJobDetailView} 
                      selectedLocation={selectedLocation}
                  />
                )}
              </div>
            </div>
            <Footer />
          </div>
          <NavigationBar />
        </div>

    );
}

export default Home;