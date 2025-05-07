import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (isCollapsed: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeCategory, 
  setActiveCategory, 
  searchTerm, 
  setSearchTerm,
  isDarkMode,
  setIsDarkMode,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isDarkMode={isDarkMode}
      />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-0 lg:ml-64'}`}>
        <Header 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;