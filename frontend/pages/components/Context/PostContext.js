import { React, createContext, useState } from 'react';

export const PostContext = createContext();

// eslint-disable-next-line react/prop-types
export const PostContextProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount(count + 1);

    return (
    <PostContext.Provider value={{ count, incrementCount }}>
        {children}
    </PostContext.Provider>
    );
};