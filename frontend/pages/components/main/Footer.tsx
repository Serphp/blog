/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from 'react';
import Social from './Socials';

const texts = [
  'PuppyCat ',
  'AAaAaAaA',
  'Estamos en mantenimiento.',
];

export default function Footer() {
  const [texto, setTexto] = useState("");
  const [isMoving, setIsMoving] = useState(false); // estado que indica si el gif se está moviendo o noado que contiene el texto actual que se muestra
  // eslint-disable-next-line no-undef
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  //const [playing , setPlaying] = useState(false); // estado que indica si el gif se está moviendo o no
  const [showText, setShowText] = useState(false); // estado que indica si el texto se está mostrando o no

  const handleCat = () => {
    //setPlaying(!playing);
    setTexto(!showText ? 'PuppyCat' : '');
    setTimeout(() => {
      setShowText(!showText);
    }, 1000);
    setIsMoving(true); // empezar a mover el gif
    setTexto(texts[Math.floor(Math.random() * texts.length)]); 
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setIsMoving(false), 1000);
  };

return (

<footer>
  <div className='fondo'>
  <div className={`thinkcont ${showText ? '' : 'hidden'}`}>
  <div className={`think ${showText ? '' : 'hidden'}`}>{texto}</div>
</div>

<div className='cat'>
    <img 
    className={isMoving ? "moving" : ""} 
    src="https://media.tenor.com/8HaTOA3o0OoAAAAi/pixel-cat.gif" 
    width="100"
    onClick={handleCat} 
    title='dont touch me!'/>
</div>

  <Social/>

    <style jsx>{`
  .moving {
    animation: rotate 1s linear infinite;
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

}