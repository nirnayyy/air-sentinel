import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextType {
  isNavbarVisible: boolean;
  showNavbar: () => void;
  hideNavbar: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider = ({ children }: NavbarProviderProps) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const showNavbar = () => setIsNavbarVisible(true);
  const hideNavbar = () => setIsNavbarVisible(false);

  return (
    <NavbarContext.Provider value={{ isNavbarVisible, showNavbar, hideNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};
