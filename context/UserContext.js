import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usercon, setUsercon] = useState(null);
  return (
    <UserContext.Provider value={{ usercon, setUsercon }}>
      {children}
    </UserContext.Provider>
  );
};
