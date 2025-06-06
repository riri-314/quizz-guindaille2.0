import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of your user data
export interface UserData {
  uid: string;
  nickname: string;
  progress: Record<number, boolean>; // e.g. { quiz1: "completed" }
}

// Define the context interface
interface UserContextType {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  clearUserData: () => void;
}

// Default empty values
const defaultUserData: UserData = {
  uid: "",
  nickname: "",
  progress: {},
};

// Create context with default (will be overwritten by provider)
const UserContext = createContext<UserContextType>({
  userData: defaultUserData,
  updateUserData: () => {},
  clearUserData: () => {},
});

interface UserDataProviderProps {
  children: React.ReactNode;
}

// Provider component
export const UserProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : defaultUserData;
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const clearUserData = () => {
    setUserData(defaultUserData);
    localStorage.removeItem("userData");
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for easy access
export const useUser = (): UserContextType => useContext(UserContext);
