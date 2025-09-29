import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const user = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Load user's applications
    const userApplications = localStorage.getItem(`applications_${user.id}`);
    if (!userApplications) {
      localStorage.setItem(`applications_${user.id}`, JSON.stringify([]));
    }
  };

  const signup = (userData) => {
    const user = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem(`applications_${user.id}`, JSON.stringify([]));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const getUserApplications = () => {
    if (!currentUser) return [];
    const applications = localStorage.getItem(`applications_${currentUser.id}`);
    return applications ? JSON.parse(applications) : [];
  };

  const saveUserApplication = (application) => {
    if (!currentUser) return null;
    
    const userApplications = getUserApplications();
    const updatedApplications = [...userApplications, application];
    localStorage.setItem(`applications_${currentUser.id}`, JSON.stringify(updatedApplications));
    return application;
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    getUserApplications,
    saveUserApplication
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};