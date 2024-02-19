// hooks/useUserRole.js
import { useState, useEffect } from 'react';
import { auth, database } from '../firebaseConfig';
import { ref, get } from "firebase/database";

const useUserRole = () => {
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const dbRef = ref(database, 'users/' + userId);

            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setRole(userData.role || '');
                } else {
                    console.log("No data available");
                }
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false); // Not logged in, so not loading
        }
    }, []);

    return { role, isLoading };
};

export default useUserRole;