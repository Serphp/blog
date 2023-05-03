import { React, createContext, useState, useEffect, KeyboardEvent } from 'react';

export const PuppyContext = createContext();

// eslint-disable-next-line react/prop-types
const PuppyProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const [cat, setCat] = useState(() => {
        const catStorage = JSON.parse(localStorage.getItem('cat') || '{}');
        return {
            start: catStorage.start || false,
            position: catStorage.position || 0,
            isMoving: catStorage.isMoving || false,
            showText: catStorage.showText || false,
            texto: catStorage.texto || '',
            Time: catStorage.Time || 0,
            Jump: catStorage.Jump || 0,
        };
      });

      const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
      };

      useEffect(() => {
        const interval = setInterval(() => {
          setCat((prevCat) => ({
            ...prevCat,
            Time: prevCat.Time + 1,
          }));
        }, 1000);
      
        return () => clearInterval(interval);
      }, []);

    const handleStart = () => {
        setCat((prevCat) => ({
            ...prevCat,
            start: !prevCat.start,
            isMoving: !prevCat.isMoving,
        }));
    };


  useEffect(() => {
    localStorage.setItem('cat', JSON.stringify(cat));
  }, [cat]);

  useEffect(() => {
    const handleKeyDown = (event) => handleArrowKeys(event);
    if (cat.start) {
        window.addEventListener('keydown', handleKeyDown);
    } else {
        window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [cat.start]);

    const handleMoveCat = () => {
    setCat((prevCat) => ({
        ...prevCat,
        isMoving: !prevCat.isMoving,

    }));
    };

    const handleArrowKeys = (KeyboardEvent) => {
        if (KeyboardEvent.code === 'Space') {
            setCat((prevCat) => ({
                ...prevCat,
                showText: true,
                texto: getRandomCatText(),
            }));
            setTimeout(() => {
                setCat((prevCat) => ({
                    ...prevCat,
                    showText: false,
                }));
            }, 1000);
        } else

            if (KeyboardEvent.code === 'ArrowLeft') {
                setCat((prevCat) => ({
                    ...prevCat,
                    position: prevCat.position - 50,
                }));
            } else if (KeyboardEvent.code === 'ArrowRight') {
                setCat((prevCat) => ({
                    ...prevCat,
                    position: prevCat.position + 50,
                }));
            } else if (KeyboardEvent.code === "ArrowDown") {
                setCat((prevCat) => ({
                    ...prevCat,
                    //showText: true,
                    position: prevCat.position = 0,
                    Jump: prevCat.Jump = 0,
                    //texto: getRandomCatText(),
                }));
            } else if (KeyboardEvent.code === 'ArrowUp') {
                setCat((prevCat) => ({
                    ...prevCat,
                    isMoving: true,
                    Jump: prevCat.Jump + 60,
                }));
        }
    };
    

      const getRandomCatText = () => {
        const catTexts = [
          "¡Miau!",
          "¡Ronrroneo...",
          "¡Aliméntame, humano!",
          "¡Soy el rey de la casa!",
          "¡Hora de la siesta, zzz...",
          "¡Woof! Oh, espera... soy un gato",
          "¡Limpia mi caja de arena, por favor!",
          "¡Cásate conmigo, humano!",
          "¡Estoy enojado, dame golosinas!",
          "¡Quiero jugar, lanza una pelota!",
        ];
        const randomIndex = Math.floor(Math.random() * catTexts.length);
        return catTexts[randomIndex];
      };

const value = { 
    cat, setCat,
    handleStart,
    handleMoveCat,
    handleArrowKeys,
    getRandomCatText,
    formatTime };

return (
<PuppyContext.Provider value={ value }>
    {isLoading ? <div>Loading...</div> : children}
</PuppyContext.Provider>
);
};

export default PuppyProvider;