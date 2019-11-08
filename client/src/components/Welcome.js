import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
import getWeb3 from "../utils/getWeb3";
class Welcome extends Component {

    state = { storageValue: 0, web3: null, accounts: null, contract: null };

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            this.setState({ web3 });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    render() {
        if (typeof web3 !== "undefined") {
            console.log("You have web3!");
            return (

                <div style={{}} className="Welcome">

                    <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <h1>Welcome!</h1>

                        <h4> You already have web3 installed!  </h4>
                        <p> To play the game just hit the Login button!  </p>
                    </div>
                </div>

            );
        }
        else if (typeof web3 === "undefined"){
            console.log("You don't have web3 :(");
            return (

                <div style={{}} className="Welcome">

                    <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <h1>Welcome!</h1>
                            <p>To play Ethgarden you need to install Metamask :(</p>
                            <p>You can do se here: <a href="https://metamask.io/">Metamask.io</a></p>

                    </div>
                </div>

            );
        }
    }
}
export default Welcome;