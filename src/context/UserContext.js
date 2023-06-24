import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/firebase";

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const values = {
    user,
    setUser,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
const useAuth = () => {
  const context = useContext(UserContext);
  return context;
};
export { useAuth };

export default UserContextProvider;
