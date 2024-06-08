import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { database } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';

const useUserRole = () => {
  const { currentUser } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setRole(data?.role || null);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  return { role, isLoading };
};

export default useUserRole;
