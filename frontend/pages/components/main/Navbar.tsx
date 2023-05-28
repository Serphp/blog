/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import { useContext } from 'react';
import { PostContext } from '../Context/PostContext';
import Social from "./Socials";
import { MenuContext } from "../Context/MenuContext";
import { WideIcon } from "@/styles/Icon/wide";
import { TinyIcon } from "@/styles/Icon/tiny"
import { useRouter } from "next/router";
import { BackIcon } from "@/styles/Icon/back";

export default function Navbar() {

    const router = useRouter();
    const {isWide, handleWide } = useContext(MenuContext);
    const {handleTheme, theme} = useContext(PostContext);
    const { pathname } = router

return (
<nav className="flex flex-column md-flex-row">
    <div className="flex justify-between">
        <div className="flex items-center p-5">

            <Link href="/">
            {
                router.pathname !== '/' ? <BackIcon/> :  
                <div className="sizelogo">
                <img src="https://i.imgur.com/pimVkwe.png"/>
                </div>
            }

            </Link>
            <span className="logo">/Serphp</span> 

            
            </div>

            {
                router.pathname !== '/' && <div className="logom">
                    <img src="https://i.imgur.com/pimVkwe.png"/>
                </div>
            }

            <div className="socialm">
                <button onClick={handleTheme} className="theme"> {theme === 'light' ? 
                <>
                <div className="light">

                <svg width="36" height="36" fill="none" stroke="currentColor" strokeLinecap="round" 
                strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992V3Z"></path>
                </svg>
                </div>
                </> : 
                <>
                <div className="dark">

                <svg width="36" height="36" fill="none" stroke="currentColor" strokeLinecap="round" 
                strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                <path d="m6.3 17.7-.7.7M3 12h1-1Zm9-9v1-1Zm8 9h1-1Zm-8 8v1-1ZM5.6 5.6l.7.7-.7-.7Zm12.8 0-.7.7.7-.7Zm-.7 12.1.7.7-.7-.7Z"></path>
                </svg>
                </div>
                </>} </button>
            <Social />
            </div>

    </div>

    <div id="nav-items" className="hidden flex sm-w-100pc flex-column md-flex md-flex-row md-justify-start items-center">
        
        {/* <Link href="/" className="nav-text fs-s1 mx-3 py-3 white no-underline">Home</Link>
        <Link href="/about" className="nav-text fs-s1 mx-3 py-3 white no-underline">About</Link> */}

        {/* <Link href="/categories" className="nav-text fs-s1 mx-3 py-3 white no-underline">Categories</Link> */}
        
    </div>
    <span className="flex items-center p-2 mr-4">
        
        {pathname === "/" && (
        <button className='showide' onClick={handleWide}> 
            {isWide ? <WideIcon/> : <TinyIcon/>}
        </button>
        )}

        <div className="social">


            <button onClick={handleTheme} className="theme"> {theme === 'light' ? 
            <>
            <div className="light">

                <svg width="36" height="36" fill="none" stroke="currentColor" strokeLinecap="round" 
                strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992V3Z"></path>
                </svg>
            </div>
            </> : 
            <>
            <div className="dark">

            <svg width="36" height="36" fill="none" stroke="currentColor" strokeLinecap="round" 
            strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path>
                <path d="m6.3 17.7-.7.7M3 12h1-1Zm9-9v1-1Zm8 9h1-1Zm-8 8v1-1ZM5.6 5.6l.7.7-.7-.7Zm12.8 0-.7.7.7-.7Zm-.7 12.1.7.7-.7-.7Z"></path>
                </svg>
            </div>
            </>} </button>
            <Social />
        </div>
    </span>
</nav>
    )
}
