/* eslint-disable no-undef */
import { ReactNode } from 'react';
import Navbar from '../components/main/Navbar';
import Footer from '../components/main/Footer';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
    <>
        <Navbar />
            {children}
        <Footer />
    </>
    );
}