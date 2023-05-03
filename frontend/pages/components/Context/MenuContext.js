import { React, createContext, useState, useEffect } from 'react';

export const MenuContext = createContext();

// eslint-disable-next-line react/prop-types
const MenuContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isWide, setIsWide] = useState(false);

    const handleWide = () => {
      setIsWide(!isWide);
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

const value = { 

    handleWide,
    isWide, setIsWide
 };

return (
<MenuContext.Provider value={ value }>
    {isLoading ? <div>Loading...</div> : children}
</MenuContext.Provider>
);
};

export default MenuContextProvider;