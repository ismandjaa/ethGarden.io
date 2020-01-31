import React, {useContext} from 'react'
import Navbar from './Navbar'
import UserNavbar from './UserNavbar'
import TokenContextProvider from "../contexts/TokenContext";
import PageContextProvider from "../contexts/PageContext";
import {LoginContext} from "../contexts/LoginContext";
import Welcome from "./Welcome";


function Check(){
    const { isLoggedIn } = useContext(LoginContext);
    if (isLoggedIn) {
        return <div>
            <PageContextProvider>
                <TokenContextProvider>



                        <UserNavbar />



                </TokenContextProvider>
            </PageContextProvider>
        </div>;
    }
    return  <div>
        <PageContextProvider>
            <TokenContextProvider>


                    <Navbar />
                    <Welcome />


            </TokenContextProvider>
        </PageContextProvider>
    </div>;
}


const Ethgarden = () => (
    Check()
);
//this used to be logincontextprovider
//wrapping navbar
//and main
export default Ethgarden
