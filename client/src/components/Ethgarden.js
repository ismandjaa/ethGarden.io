import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import UserNavbar from './UserNavbar'
import LoginContextProvider from "../contexts/LoginContext";
import TokenContextProvider from "../contexts/TokenContext";
import PageContextProvider from "../contexts/PageContext";

const Ethgarden = () => (
    <div>
        <PageContextProvider>
        <TokenContextProvider>
        <LoginContextProvider>


            <UserNavbar />


        </LoginContextProvider>
        </TokenContextProvider>
        </PageContextProvider>
    </div>
);
//this used to be logincontextprovider
//wrapping navbar
//and main
export default Ethgarden
