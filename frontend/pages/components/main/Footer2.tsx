/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';

interface CatState {
  position: number;
  isMoving: boolean;
  showText: boolean;
  texto: string;
}

const Footer: React.FC = () => {
  const [cat, setCat] = useState<CatState>(() => {
    const catStorage = JSON.parse(localStorage.getItem('cat') || '{}') as CatState;
    return {
      position: catStorage.position || 0,
      isMoving: catStorage.isMoving || false,
      showText: catStorage.showText || false,
      texto: catStorage.texto || '',
    };
  });

  const handleMoveCat = () => {
    setCat((prevCat) => ({
      ...prevCat,
      isMoving: !prevCat.isMoving,
    }));
  };

  const handleArrowKeys = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft') {
      setCat((prevCat) => ({
        ...prevCat,
        position: prevCat.position - 20,
      }));
    } else if (e.code === 'ArrowRight') {
      setCat((prevCat) => ({
        ...prevCat,
        position: prevCat.position + 20,
      }));
    }
  };

  useEffect(() => {
    localStorage.setItem('cat', JSON.stringify(cat));
  }, [cat]);

  useEffect(() => {
    window.addEventListener('keydown', handleArrowKeys);

    return () => {
      window.removeEventListener('keydown', handleArrowKeys);
    };
  }, []);

  return (
    <footer>
      <div className='fondo'>
        <div className={`thinkcont ${cat.showText ? '' : 'hidden'}`}>
          <div className={`think ${cat.showText ? '' : 'hidden'}`}>
            {cat.texto}
          </div>
        </div>

        <div className='cat' style={{ marginLeft: `${cat.position}px` }}>
          <img
            className={cat.isMoving ? 'moving' : ''}
            src='https://media.tenor.com/8HaTOA3o0OoAAAAi/pixel-cat.gif'
            width='100'
            onClick={handleMoveCat}
            title='dont touch me!'
          />
        </div>

        <div className='bar'></div>

        <p className='copy'>
          © 2021 PuppyCat <br />
          Serphp
        </p>

        <style jsx>{`
          .moving {
            animation: rotate 1s linear ;
          }

          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .thinkcont.hidden {
            display: none;
          }

          .think.hidden {
            visibility: hidden;
          }
        `}</style>
      </div>
    </footer>
  );
};

export default Footer;
