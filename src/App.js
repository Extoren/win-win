import logo from './Bilder/Logo_CC.png';
import './App.css';
import FAQ from "./Pages/FAQ";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { simulateTyping } from './simulateTyping';
import React, { useState, useEffect, useRef } from 'react';


// Example jobs data
const jobsData = [
  { id: 1, svg: 'gress', title: 'Gressklipping', description: 'Description for Job 1', price: '100' },
  { id: 2, svg: 'Løvrydding', title: 'Løvrydding', description: 'Description for Job 2', price: '200' },
  { id: 2, svg: 'Snømåking', title: 'Snømåking', description: 'Description for Job 2', price: '50' },
  // Add more job objects here...
];

function getSvg(svgName) {
  switch (svgName) {
    case 'gress':
      return (
        <div className="grass">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-leaf" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );
    case 'Løvrydding':
      return (
        <div className="Løvrydding">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-wind" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );
    case 'Snømåking':
      return (
        <div className="Snømåking">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-snowflake" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );
    case 'Hundelufting':
      return (
        <div className="Snømåking">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-dog" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );
    case 'biler':
      return (
        <div className="biler">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-car" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );
    case 'Selge produkter':
      return (
        <div className="Selge produkter">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-cookie-bite" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );
    case 'Lekerengjøring':
      return (
        <div className="Lekerengjøring">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-broom" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                
    case 'Plantepleie':
      return (
        <div className="Lekerengjøring">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-seedling" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      ); 
    case 'Bake og selge kaker':
      return (
        <div className="Bake og selge kaker">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-birthday-cake" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                 
    case 'Hjemmeorganisering':
      return (
        <div className="Lekerengjøring">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-home" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );   
    case 'Hente posten':
      return (
        <div className="Hente posten">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-mail-bulk" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                  
    case 'Babysitting':
      return (
        <div className="Hente posten">
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
    case 'Male gjerder':
      return (
        <div className="Hente posten">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-paint-roller" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                  
    case 'Småreparasjoner':
      return (
        <div className="Hente posten">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-tools" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                   
    case 'Levere aviser':
      return (
        <div className="Levere aviser">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-newspaper" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                        
    case 'Organisere garasjesalg':
      return (
        <div className="Organisere garasjesalg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-tags" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                              
    case 'Datatjenester for eldre':
      return (
        <div className="Datatjenester for eldre">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-laptop" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                                   
    case 'Plantepleie':
      return (
        <div className="Plantepleie">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-seedling" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                                
    case 'Vannplanter for naboer':
      return (
        <div className="Vannplanter for naboer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-tint" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );                         
    case 'Hjelpe til med å flytte':
      return (
        <div className="Hjelpe til med å flytte">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-truck" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
      );               


    default:
      return null;
  }
}

const JobCard = ({ job, onClick }) => (
  <div className="job-card" onClick={() => onClick(job)}>
    {/* Start here */}
    <div className="job-card">
      <div className="job-card-header">
          {getSvg(job.svg)}
        <div className="menu-dot" />
      </div>
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

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || '');
  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showLocations, setShowLocations] = useState(false);
  const [jobFilter, setJobFilter] = useState('');
  const inputRef = useRef(null);
  const categories = [
    'Barnepass', 'Gressklipping', 'Løvrydding', 'Snømåking', 'Hundelufting', 'Vaske biler', 'Selge produkter', 
    'Lekerengjøring', 'Plantepleie', 'Bake og selge kaker', 'Hjemmeorganisering', 'Hente posten', 'Babysitting',
    'Male gjerder' , 'Småreparasjoner', 'Levere aviser', 'Organisere garasjesalg', 'Datatjenester for eldre',
    'Hjelpe med hagearbeid', 'Vannplanter for naboer', 'Hjelpe til med å flytte'
  ];


  const handleJobClick = (job) => {
    setSelectedJob(job);
  };


  const handleCategorySelection = (categoryName) => {
    setJobFilter(categoryName);
    simulateTyping(inputRef, categoryName);
};


  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark-mode' ? '' : 'dark-mode';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Filter categories based on input
  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(jobFilter.toLowerCase())
  );

  
  // Handle scroll event
  const handleScroll = () => {
    if (wrapperRef.current.scrollTop > 30) {
      headerRef.current.classList.add("header-shadow");
    } else {
      headerRef.current.classList.remove("header-shadow");
    }
  };

  const toggleLocations = () => {
    setShowLocations(!showLocations);
  };

  // Load theme from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || '';
    setTheme(savedTheme);
    document.body.className = theme;

    // Add scroll event listener
    const wrapper = wrapperRef.current;
    wrapper.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <div className="container">
      <div className="header" ref={headerRef}>
        <div className="logo">
          <Link to="/index.html">
            <img src={logo} alt="logo" id="logo" />
          </Link>
          <p>Winstinct!</p>
        </div>
          <div className="header-menu-container">
            <div className="header-menu">
                <Link to="/index.html" className="active" >Finn Jobb</Link>
                <Link to="/faq">FAQ</Link>
              </div>
          </div>
      <div className="user-settings">
      <div className={`App ${theme}`}>
        <div className="dark-light" onClick={toggleTheme}>
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
        {/*<img class="user-profile" src="#" alt="">
      <button id="sign-out-btn"></button>*/}
        <Link to="/Login">
          <div className="user-name">Logg inn</div>
        </Link>
      </div>
    </div>
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
        <div className="search-bar">
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
        </div>
        <div className="search-location" onClick={toggleLocations}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx={12} cy={10} r={3} />
          </svg>
          Norge, <span className="Change"> Velg By</span>
          <i className="fas fa-chevron-down" style={{ position: "absolute", right: 10 }} />
        {showLocations && (
          <div className="other-locations">
            <p className="selected-location">Velg By</p>
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
        <div className="search-salary">
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
        </div>
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
                placeholder="Søk etter sted eller adresse"
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
                <input type="checkbox" id="job1" className="job-style" />
                <label htmlFor="job1">Agder</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job2" className="job-style" />
                <label htmlFor="job2">Innlandet</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job3" className="job-style" />
                <label htmlFor="job3">Møre og Romsdal</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job4" className="job-style" />
                <label htmlFor="job4">Nordland</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input
                  type="checkbox"
                  id="job5"
                  className="job-style"
                  defaultChecked=""
                />
                <label htmlFor="job5">Oslo</label>
                <span className="job-number">1</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job1" className="job-style" />
                <label htmlFor="job1">Rogaland</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job2" className="job-style" />
                <label htmlFor="job2">Svalbard</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job3" className="job-style" />
                <label htmlFor="job3">Troms og Finnmark</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job4" className="job-style" />
                <label htmlFor="job4">Trøndelag</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job5" className="job-style" />
                <label htmlFor="job5">Vestfold og Telemark</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job4" className="job-style" />
                <label htmlFor="job4">Vestland</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job5" className="job-style" />
                <label htmlFor="job5">Viken</label>
                <span className="job-number">0</span>
              </div>
            </div>
          </div>
          <div className="job-time">
            <div className="job-time-title">Ansettelsestype</div>
            <div className="job-wrapper">
              <div className="type-container">
                <input type="checkbox" id="job1" className="job-style" />
                <label htmlFor="job1">Heltidsjobber</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job2" className="job-style" />
                <label htmlFor="job2">Deltidsjobber</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job3" className="job-style" />
                <label htmlFor="job3">Eksterne jobber</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job4" className="job-style" />
                <label htmlFor="job4">Kontrakt</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input
                  type="checkbox"
                  id="job5"
                  className="job-style"
                  defaultChecked=""
                />
                <label htmlFor="job5">Små jobber</label>
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
                  id="job7"
                  className="job-style"
                  defaultChecked=""
                />
                <label htmlFor="job7">Studentnivå</label>
                <span className="job-number">1</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job8" className="job-style" />
                <label htmlFor="job8">Inngangsnivå</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job9" className="job-style" />
                <label htmlFor="job9">Midtnivå</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job10" className="job-style" />
                <label htmlFor="job10">Seniornivå</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job11" className="job-style" />
                <label htmlFor="job11">Regissører</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job12" className="job-style" />
                <label htmlFor="job12">VP eller over</label>
                <span className="job-number">0</span>
              </div>
            </div>
          </div>
          <div className="job-time">
            <div className="job-time-title">Lønnsområde</div>
            <div className="job-wrapper">
              <div className="type-container">
                <input
                  type="checkbox"
                  id="job13"
                  className="job-style"
                  defaultChecked=""
                />
                <label htmlFor="job13">0kr - 100kr</label>
                <span className="job-number">1</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job14" className="job-style" />
                <label htmlFor="job14">100kr - 200kr</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job15" className="job-style" />
                <label htmlFor="job15">200kr - 500kr</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job16" className="job-style" />
                <label htmlFor="job16">500kr - 1500kr</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job17" className="job-style" />
                <label htmlFor="job17">1500kr - 3000kr</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job18" className="job-style" />
                <label htmlFor="job18">3000kr - 4000kr</label>
                <span className="job-number">0</span>
              </div>
              <div className="type-container">
                <input type="checkbox" id="job19" className="job-style" />
                <label htmlFor="job19">4000kr - 5000kr</label>
                <span className="job-number">0</span>
              </div>
            </div>
          </div>
        </div>
        <div className="searched-jobs">
          <div className="searched-bar">
            <div className="searched-show">Viser 1 jobb(er)</div>
            <div className="searched-sort">
              Sorter etter: <span className="post-time">Nyeste Post </span>
              <span className="menu-icon">▼</span>
            </div>
          </div>
          <div className="job-cards">
              {jobsData.map(job => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
              ))}
          </div>
          <div className="job-overview">
            <div className="job-overview-cards">
              <div className="job-overview-card">
                <div className="job-card overview-card">
                  <div className="overview-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <rect width="100%" height="100%" fill="#fff" />
                      <foreignObject
                        width="100%"
                        height="100%"
                        style={{
                          backgroundColor: "#fff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%"
                          }}
                        >
                          <i
                            className="fas fa-leaf"
                            style={{ color: "#ffae00", fontSize: 24 }}
                          />
                        </div>
                      </foreignObject>
                    </svg>
                    <div className="overview-detail">
                      <div className="job-card-title">Gressklipping</div>
                      <div className="job-card-subtitle">(Adresse)</div>
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
              </div>
              {/*<div class="job-overview-card">
        <div class="job-card overview-card">
         <div class="overview-wrapper">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff" style="background-color:#1e1f26">
         <path d="M24 7.6c0-.3 0-.5-.4-.6C12.2.2 12.4-.3 11.6 0 3 5.5.6 6.7.2 7.1c-.3.3-.2.8-.2 8.3 0 .9 7.7 5.5 11.5 8.4.4.3.8.2 1 0 11.2-8 11.5-7.6 11.5-8.4V7.6zm-1.5 6.5l-3.9-2.4L22.5 9zm-5.3-3.2l-4.5-2.7V2L22 7.6zM12 14.5l-3.9-2.7L12 9.5l3.9 2.3zm-.8-12.4v6L6.8 11 2.1 7.6zm-5.8 9.6l-3.9 2.4V9zm1.3 1l4.5 3.1v6l-9-6.3zm6 9.1v-6l4.6-3.1 4.6 2.8z" /></svg>
          <div class="overview-detail">
           <div class="job-card-title">Product Designer</div>
           <div class="job-card-subtitle">
            4517 Washington Ave. Syracuse.
           </div>
          </div>
          <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">
           <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" /></svg>
         </div>
         <div class="job-overview-buttons">
          <div class="search-buttons time-button">Full Time</div>
          <div class="search-buttons level-button">Senior Level</div>
          <div class="job-stat">New</div>
          <div class="job-day">4d</div>
         </div>
        </div>
       </div>*/}
            </div>
            <div className="job-explain">
              <img
                className="job-bg"
                src="https://www.deere.no/assets/images/region-2/products/commercial-mowing/front-rotary-mowers/1600t-wide-area-rotary-mower-r2c010728-hero.jpg"
                alt=""
              />
              <div className="job-logos">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  style={{ backgroundColor: "#f76754" }}
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M0 .5h4.2v23H0z"
                    fill="#042b48"
                    data-original="#212121"
                  />
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M15.4.5a8.6 8.6 0 100 17.2 8.6 8.6 0 000-17.2z"
                    fill="#fefefe"
                    data-original="#f4511e"
                  />
                </svg>
              </div>
              <div className="job-explain-content">
                <div className="job-title-wrapper">
                  <div className="job-card-title">UI /UX Designer</div>
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
                    (Navn Person)
                    <span className="comp-location">(Adresse)</span>
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
                    <div className="explain-subtitle">(Lønn)</div>
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
                  <div className="overview-text-item">Tilleggsinfo</div>
                  <div className="overview-text-item">Tilleggsinfo</div>
                  <div className="overview-text-item">Tilleggsinfo</div>
                  <div className="overview-text-item">Tilleggsinfo</div>
                  <div className="overview-text-item">Tilleggsinfo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Router>
  );
}

export default App;
