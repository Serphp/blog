/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect  } from 'react';
import { PuppyContext } from '../Context/PuppyContext';

// interface CatState {
//   position: number;
//   isMoving: boolean;
//   showText: boolean;
//   texto: string;
//   Playing: boolean;
// }

const Footer: React.FC = () => {
  const { cat, 
    handleMoveCat, handleStart, formatTime } = useContext(PuppyContext);

  return (
    <footer>
      <div className='fondo'>
        <div className={`thinkcont ${cat.showText ? '' : 'hidden'}`}>
          <div className={`think ${cat.showText ? '' : 'hidden'}`}>
            {cat.texto}
          </div>
        </div>

        <div className='cat' style={{ position: 'absolute', left: `${cat.position}px` }}>
          {/* <div style={{ display: `${cat.Playing ? 'block' : 'none'}` }}> */}
            <div style={{ position: 'absolute', top: `${-cat.Jump}px` }}>
          <img
            className={cat.isMoving ? 'moving' : ''}
            src='https://media.tenor.com/8HaTOA3o0OoAAAAi/pixel-cat.gif'
            width='100'
            onClick={handleStart}
            title='dont touch me!'
          />
          </div>
          {/* </div> */}
        </div>

<section className='social'>
<div className='puppycontainer'>
<div className='puppyhome'>
   Serphp
  </div>

  <p className='copy'>
          © 2021 PuppyCat <br />
          Serphp
        </p>

      <div className='puppy'>
        Time: {formatTime(cat.Time)}
        </div>
  </div>
  </section>


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
