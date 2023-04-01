import Link from "next/link";
import { useContext } from 'react';
import { PostContext } from '../Context/PostContext';

export default function Navbar() {

    const {handleTheme} = useContext(PostContext);

    //console.log(toggleTheme);

return (
<nav>
    <div className="theme">
        <Link href="/">
            <span className="nav-text"> Home </span>
        </Link>
        <Link href="/about">
            <span className="nav-text"> About </span>
        </Link>
    </div>

    <button className='toggletheme' onClick={handleTheme}>
    hola 
    </button>

    </nav>)
}
