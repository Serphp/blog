import { React, createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

// eslint-disable-next-line react/prop-types
const PostContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        typeof window !== 'undefined'
          ? localStorage.getItem('theme') || 'light'
          : 'light'
      );
  const [isLoading, setIsLoading] = useState(true);

const getfavorites = () => {
    if (typeof window !== 'undefined') {
        JSON.parse(localStorage.getItem('favorites') || '[]');
    }
};

useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}, [theme]);

useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    setTheme(localTheme || 'light');
    setIsLoading(false);
}, []);

  const handleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const value = { theme, setTheme, handleTheme, getfavorites };

  return (
    <PostContext.Provider value={value}>
      {isLoading ? <div>Loading...</div> : children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
