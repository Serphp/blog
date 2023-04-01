import { React, createContext, useState, useEffect } from 'react';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
const [theme, setTheme] = useState('none');
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
    setIsLoading(false);
}, []);

const handleTheme = () => {
    setTheme((prevTheme) => {
    const newTheme = prevTheme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    //console.log(theme)
    return newTheme;
});
};

const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
};

return (
<PostContext.Provider value={{ theme, setTheme, handleTheme, toggleTheme }}>
    {isLoading ? <div>Loading...</div> : children}
</PostContext.Provider>
);
};