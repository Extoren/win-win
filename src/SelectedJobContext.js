// Context setup (e.g., SelectedJobContext.js)
import React, { createContext, useContext, useState } from 'react';

const SelectedJobContext = createContext();

export const SelectedJobProvider = ({ children }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  const selectJob = (jobId) => {
    setSelectedJobId(jobId);
    // Here, you could navigate to '/jobb' without changing the browser URL directly
  };

  return (
    <SelectedJobContext.Provider value={{ selectedJobId, selectJob }}>
      {children}
    </SelectedJobContext.Provider>
  );
};

// Custom hook to use the selected job context
export const useSelectedJob = () => useContext(SelectedJobContext);
