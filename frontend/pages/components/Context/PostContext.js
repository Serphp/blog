import { React, createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

// eslint-disable-next-line react/prop-types
const PostContextProvider = ({ children }) => {
const [theme, setTheme] = useState('none');
const [isLoading, setIsLoading] = useState(true);


const getfavorites = () => {
    if (typeof window !== 'undefined') {
        JSON.parse(localStorage.getItem('favorites') || '[]');
      }
}

//const postExists = favorites.some((favorite: Post) => favorite._id === post._id);

useEffect(() => {
    if (theme){
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", "light");
    }
}, [theme]);

useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
    setIsLoading(false);
}, []);

const handleTheme = () => {
    setTheme((prevTheme) => {
    const newTheme = prevTheme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    console.log(theme)
    return newTheme;
});
};

const handleThemeClick = () => {
    setTheme((prevTheme) => {
      return prevTheme === 'light' ? 'dark' : 'light';
    });
  };

const value = { theme, setTheme, handleTheme, getfavorites, handleThemeClick };

return (
<PostContext.Provider value={ value }>
    {isLoading ? <div>Loading...</div> : children}
</PostContext.Provider>
);
};

export default PostContextProvider;