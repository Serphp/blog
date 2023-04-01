//import React from "react";
import Link from "next/link";

export default function Navbar() {
return (
<nav>
    <div className="">
        <Link href="/">
            <span className="nav-text"> Home </span>
        </Link>
        <Link href="/about">
            <span className="nav-text"> About </span>
        </Link>
    </div>
    </nav>)
}
