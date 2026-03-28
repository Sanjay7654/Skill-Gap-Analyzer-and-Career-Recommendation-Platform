import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || null
  );

  const saveUser = (id) => {
    if (id) {
      localStorage.setItem("userId", id);
    } else {
      localStorage.removeItem("userId");
    }
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};
