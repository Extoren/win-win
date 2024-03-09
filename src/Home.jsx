import './App.css';
import { simulateTyping } from './simulateTyping';
import React, { useState, useRef, useEffect  } from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from './firebaseConfig'; 
import Header from './header';
import getSvg  from './Accesorios/getSvg';
import getImg  from './Accesorios/getImg';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import { jobTypeCategoryMapping } from './jobTypeCategoryMapping';
import { useTranslation } from 'react-i18next'
import { selectCategories } from './selectCategories';



export const JobCard = ({ job, onClick }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  }

  const hideMenu = () => {
    setShowMenu(false);
  }

  const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
      localStorage.setItem('appLanguage', language); // Save the selected language to localStorage
    };
    
    useEffect(() => {
      const savedLanguage = localStorage.getItem('appLanguage');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
      // Include other initialization logic here as necessary
    }, []); // The empty array ensures this effect runs only once on mount

  return (
    <div className="job-card" onClick={() => onClick(job)}>
      {/* Start here */}
      <div className="job-card" onMouseLeave={hideMenu}>
        <div className="job-card-header">
          {getSvg(job.logo)}
            <div className="menu-holder" onClick={toggleMenu}>
              <div className="menu-dot">
            </div>
            </div>
            {showMenu && (
              <div className="menu"  onMouseLeave={hideMenu}>
                <div className="menu-item">
                  <i className="fas fa-heart" style={{ marginRight: '8px' }}></i>
                  {t('favorite')}
                </div>
                <div className="menu-item">
                  <i className="fas fa-flag" style={{ marginRight: '8px' }}></i>
                    {t('anmeld')}
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
              {t('søk')}
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
              {getSvg(job.logo)}
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
            {getSvg(job.logo)}
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
    const [isPopupVisible, setIsPopupVisible] = useState(false);
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

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);


    // When jobs or selectedCategory changes, update filteredJobs
    useEffect(() => {
      if (!selectedCategory) {
        // If no category is selected, show all jobs
        setFilteredJobs(jobs);
      } else {
        // Get the job types associated with the selected category
        const jobTypes = jobTypeCategoryMapping[selectedCategory];

        // Filter jobs where their type matches any of the types in the jobTypes array
        const updatedFilteredJobs = jobs.filter(job => 
          jobTypes.includes(job.typeJobb)
        );

        setFilteredJobs(updatedFilteredJobs);
      }

      setJobCount(filteredJobs.length);
    }, [jobs, selectedCategory]); // Only re-run the effect if jobs or selectedCategory changes


     // Toggle category selection
    const handleCategoryClick = (categoryName) => {
      setSelectedCategories(prevCategories => {
        if (prevCategories.includes(categoryName)) {
          return prevCategories.filter(cat => cat !== categoryName); // Unselect category
        } else {
          return [...prevCategories, categoryName]; // Select category
        }
      });
    };

    // Check if category is selected
    const isCategorySelected = (categoryName) => {
      return selectedCategories.includes(categoryName);
    };

    // Apply filters based on selected categories
  useEffect(() => {
    const updatedFilteredJobs = jobs.filter(job => {
      if (selectedCategories.length === 0) {
        return true; // No category selected, show all jobs
      }
      // Job should match at least one of the selected categories
      return selectedCategories.some(category =>
        jobTypeCategoryMapping[category].includes(job.typeJobb)
      );
    });

    setFilteredJobs(updatedFilteredJobs);
    setJobCount(updatedFilteredJobs.length);
  }, [jobs, selectedCategories]); // Update dependency array





    const handleCloseClick = () => {
      setIsPopupVisible(false); // This will hide the popup menu
  };
  

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('appLanguage', language); // Save the selected language to localStorage
  };
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
    // Include other initialization logic here as necessary
  }, []); // The empty array ensures this effect runs only once on mount

    useEffect(() => {
      setEmploymentTypeCounts(countJobsByEmploymentType(jobs));
      setSeniorityLevelCounts(countJobsBySeniorityLevel(jobs));
    }, [jobs]);

    
    useEffect(() => {
      const usersRef = ref(database, 'users');
      onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        const usersObject = {};
        for (const key in usersData) {
          usersObject[key] = {
            name: usersData[key].name,
            surname: usersData[key].surname
          };
        }
        setUsers(usersObject);
      });
    }, []);

    useEffect(() => {
      const jobRef = ref(database, 'jobs');
      onValue(jobRef, (snapshot) => {
        let jobFound = false;
        snapshot.forEach(userSnapshot => {
          const userJobs = userSnapshot.val();
          const userJob = userJobs[jobId];
          if (userJob) {
            jobFound = true;
            const user = users[userSnapshot.key]; // get the user data using the key
            const userName = user ? `${user.name} ${user.surname}` : 'Unknown User';
            setSelectedJob({
              id: jobId,
              ...userJob,
              userName: userName, // set the userName here
            });
          }
        });
    
        if (!jobFound) {
          // console.log("Job not found");
          // Optionally redirect to home or show an error
          // navigate('/');
        }
      });
    }, [jobId, users]); // Depend on users here to make sure user data is available
    


    // Now fetch jobs
    useEffect(() => {
      const jobsRef = ref(database, 'jobs');
      onValue(jobsRef, (snapshot) => {
        const jobsData = snapshot.val();
        const loadedJobs = [];
        for (const userId in jobsData) {
          for (const jobId in jobsData[userId]) {
            const user = users[userId];
            // Check if user data exists to avoid undefined errors
            const userName = user ? `${user.name} ${user.surname}` : 'Unknown User';
            loadedJobs.push({
              id: jobId,
              ...jobsData[userId][jobId],
              userName: userName // Now we have the userName included
            });
          }
        }
        setJobs(loadedJobs);
      });
    }, [users]); // Depend on the users state here to re-run when users are fetched
      
    
    

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

    const togglePopupMenu = () => {
      setIsPopupVisible(!isPopupVisible);
    };
    
    const PopupMenu = ({ handleClose }) => {

      // Function to handle click inside the popup menu without closing it
      const handleMenuClick = (e) => {
       // e.stopPropagation();
      };
    


      return (
      <div className="popup-menu" onClick={handleMenuClick}>
        <button className="close-button" onClick={handleClose}>X</button>
        <h1>Filtrer</h1>
        <div className="popup-menu-content">
          <div className="job-time" id="background-change">
            <div className="job-time-title">{t('lønnsområde')}</div>
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
                  <input type="checkbox" id="job18" className="job-style" checked={selectedSeniorityLevels.includes("Studentnivå")} onChange={(e) => handleSeniorityLevelSelection("Studentnivå", e)}/>
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
        </div>
    );
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
    
    
    
    
    // ...previous code

useEffect(() => {
  const filterJobs = () => {
    return jobs
      .filter(job => {
        // Match category if one is selected
        const matchesCategory = !selectedCategory || jobTypeCategoryMapping[selectedCategory].includes(job.typeJobb);
        // Match price range
        const jobPrisNumber = Number((job.pris || '').replace(/\D/g, '')) || 0;
        const matchesPrice = !priceRange.max || jobPrisNumber <= priceRange.max;
        // Match location
        const matchesLocation = !selectedLocation || job.fylke === selectedLocation;
        // Match employment type
        const matchesEmploymentType = !selectedEmploymentTypes.length || selectedEmploymentTypes.includes(job.ansettelsestype);
        // Match seniority level
        const matchesSeniorityLevel = !selectedSeniorityLevels.length || selectedSeniorityLevels.includes(job.erfaring);

        return matchesCategory && matchesPrice && matchesLocation && matchesEmploymentType && matchesSeniorityLevel;
      });
  };

  const updatedFilteredJobs = filterJobs();
  setFilteredJobs(updatedFilteredJobs);
  setJobCount(updatedFilteredJobs.length); // Update job count based on all applied filters

  // Update the counts for the filters based on the filtered jobs
  setEmploymentTypeCounts(countJobsByEmploymentType(updatedFilteredJobs));
  setSeniorityLevelCounts(countJobsBySeniorityLevel(updatedFilteredJobs));
  setJobCounts(countJobsByCounty(updatedFilteredJobs)); // Assuming you use this state to dynamically render County options
}, [jobs, selectedCategory, priceRange, selectedLocation, selectedEmploymentTypes, selectedSeniorityLevels]);

// ...rest of your component

    
    
    

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
          {isPopupVisible && <PopupMenu handleClose={handleCloseClick} />}
          <Header onClose={closeJobDetailView}/>
            <div className={`wrapper ${theme}`} ref={wrapperRef}>
            <div className="select-category">
              <div className="category-wrapper">
              {selectCategories.map((category, index) => (
                <p
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => handleCategoryClick(category.label)}
                  style={{
                    backgroundColor: isCategorySelected(category.label) ? 'var(--Hover-color)' : 'var(--alert-bg-color)', // Change the color based on selection
                    color: isCategorySelected(category.label) ? 'var(--selected-text-color)' : 'inherit',
                  }}
                >
                  <i 
                    className={category.icon} 
                    style={{ 
                      color: isCategorySelected(category.label) ? 'white' : hoverIndex === index ? 'white' : 'var(--active-color)',
                    }}
                  ></i>
                  <span style={{
                    textDecorationColor: isCategorySelected(category.label) ? 'white' : hoverIndex === index && theme !== 'dark-mode' ? 'white' : 'var(--active-color)'
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
                <button className="search-button">{t('find_job')}</button>
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
                  <div className="job-time-title">{t('lønnsområde')}</div>
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
              <div className="settings-container" onClick={togglePopupMenu}>
                  <div className="settings-icon"></div>
                  <div className="settings-icon"></div>
                  <div className="settings-icon"></div>
              </div>
                <div className={`searched-bar ${selectedJob ? "hide-searched-bar" : ""}`}>
                  <div className="searched-show">Viser {jobCount} jobber</div>
                    <div className="searched-sort">
                      {t('sorter')}: <span className="post-time">Nyeste Post </span>
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
            {!selectedJob && <Footer />}
          </div>
          <NavigationBar />
        </div>

    );
}

export default Home;