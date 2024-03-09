import React from 'react';
import '../App.css';

function getSvg(svgName) {
    switch (svgName) {

      
      case 'fas fa-child': 
        return (
          <div className="child">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-child" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );
      case 'fas fa-leaf': 
        return (
          <div className="child">
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
      case 'fas fa-heart': 
        return (
          <div className="child">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-heart" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );
      case 'fas fa-tools': 
      return (
        <div className="child">
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
      case 'fas fa-brush': 
      return (
        <div className="brush">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-brush" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );       
      case 'fas fa-broom': 
      return (
        <div className="broom">
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
      case 'fas fa-tint': 
        return (
          <div className="tint">
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
      case 'fas fa-camera': 
      return (
        <div className="tint">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-camera" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );                       
      case 'fas fa-car': 
      return (
        <div className="tint">
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
      case 'fas fa-coffee': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-coffee" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );              
      case 'fas fa-cog': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-cog" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );           
      case 'fas fa-flag': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-flag" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );       
      case 'fas fa-globe': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-globe" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );        
      case 'fas fa-home': 
      return (
        <div className="tint">
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
      case 'fas fa-tree': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-tree" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );    
      case 'fas fa-paw': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-paw" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );    
      case 'fas fa-seedling': 
        return (
          <div className="tint">
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
      case 'fas fa-utensils': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-utensils" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );    
      case 'fas fa-dustpan': 
        return (
          <div className="tint">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-dustpan" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );    
      case 'fas fa-snowflake': 
      return (
        <div className="tint">
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
      case 'fas fa-sun': 
      return (
        <div className="tint">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-sun" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );    
      case 'fas fa-recycle': 
      return (
        <div className="recycle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-recycle" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );    
      case 'fas fa-book': 
        return (
          <div className="book">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-book" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );           
      case 'fas fa-apple-alt': 
      return (
        <div className="apple-alt">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-apple-alt" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );          
      case 'fas fa-soap': 
      return (
        <div className="soap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-soap" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );         
      case 'fas fa-basketball-ball': 
      return (
        <div className="basketball-ball">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-basketball-ball" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );                   
      case 'fas fa-bed': 
        return (
          <div className="bed">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-bed" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );        
      case 'fas fa-desktop': 
        return (
          <div className="desktop">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-desktop" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );              
      case 'fas fa-plug': 
      return (
        <div className="plug">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                <rect width="100%" height="100%" fill="#fff" />
                <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                    }}
                  >
                    <i className="fas fa-plug" style={{ color: "#ffae00", fontSize: 24 }}
                    />
                  </div>
                </foreignObject>
              </svg>
      </div>
    );        
      case 'fas fa-water': 
        return (
          <div className="water">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-water" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
      );                          



      
      case 'default':
        return (
          <div className="default">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ backgroundColor: "#fff" }}>
                  <rect width="100%" height="100%" fill="#fff" />
                  <foreignObject width="100%" height="100%" style={{backgroundColor: "#fff", display: "flex", justifyContent: "center", alignItems: "center"
                    }}
                  >
                    <div style={{display: "flex",justifyContent: "center",alignItems: "center", height: "100%"
                      }}
                    >
                      <i className="fas fa-question" style={{ color: "#ffae00", fontSize: 24 }}
                      />
                    </div>
                  </foreignObject>
                </svg>
        </div>
        );
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


export default getSvg;