/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import { useContext } from 'react';
import { PostContext } from '../Context/PostContext';
import Social from "./Socials";

export default function Navbar() {

    const {handleTheme} = useContext(PostContext);

    //console.log(toggleTheme);

return (
<nav className="flex flex-column md-flex-row px-10">
    <div className="flex justify-between">
        <span className="flex items-center p-10 mr-5">
            <img className="max-h-l3 w-auto hover-scale-up-3 ease-300" src="https://i.imgur.com/pimVkwe.png"/>
            Hola
            </span>
        <a data-toggle="toggle-nav" data-target="#nav-items" href="#"
            className="flex items-center ml-auto md-hidden opacity-70">
            <div className="m-3 br-4 border-white p-1">
                <div className="border-t border-white my-1 px-3"></div>
                <div className="border-t border-white my-1"></div>
                <div className="border-t border-white my-1"></div>
            </div>
        </a>
    </div>
    <div id="nav-items" className=" flex sm-w-100pc flex-column md-flex md-flex-row md-justify-start items-center">
        <Link href="/" className="nav-text fs-s1 mx-3 py-3 white no-underline">Home</Link>
        <Link href="/about" className="nav-text fs-s1 mx-3 py-3 white no-underline">About</Link>
        <Link href="/categories" className="nav-text fs-s1 mx-3 py-3 white no-underline">Categories</Link>
    </div>
    <span className="flex items-center p-2 mr-4">
        <div className="social">
            <Social />
        </div>

    </span>
    <span className="flex items-center p-2 mr-4">
    <button className='button bg-blue-lightest blue focus-blue' onClick={handleTheme}>
    Color 
    </button>
            </span>
</nav>
    )
}
