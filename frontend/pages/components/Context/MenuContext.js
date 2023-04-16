import { React, createContext, useState, useEffect } from 'react';

export const MenuContext = createContext();

// eslint-disable-next-line react/prop-types
const MenuContextProvider = ({ children }) => {
    const isLoading = false;


const value = { children };

return (
<MenuContext.Provider value={ value }>
    {isLoading ? <div>Loading...</div> : children}
</MenuContext.Provider>
);
};

export default MenuContextProvider;