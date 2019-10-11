import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import AppBar from '@material-ui/core/AppBar';

import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

    runExample2 = async () => {
        const { accounts, contract } = this.state;

        // Stores a given value, 5 by default.
        await contract.methods.set(1337).send({ from: accounts[0] });

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();

        // Update state with the result.
        this.setState({ storageValue: response });
    };

    runSignNounce = async () => {
        const { web3 } = this.state;

        //password: greattesting
        //word: bless price ability shy chimney noble sad weird fringe jaguar host large
        //word: reason sport suggest nerve arena talk limit marine capital venture practice tree fantasy olive dutch hurdle dish usual giggle foot venue satisfy skate dice

        web3.eth.personal.sign("123", "0xfEDE2b489847Ed92a76D9c68C700782A68a3251c", "greattesting", getit)
            .then(console.log, getit());

        function getit(callback){
            console.log("was called" + callback);
        }





        //web3.eth.personal.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
            //.then(console.log, );


        // Update state with the result.
        //this.setState({ storageValue: final });
    };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (

      <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }} className="App">
          <div>
              <AppBar color="primary" position="static">
                  <h1>My header</h1>
              </AppBar>

          </div>

        <h1>Smart Contract UI TEST</h1>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5.
        </p>
        <b>The stored value is: <h2>{this.state.storageValue}</h2></b>
          <Button variant="danger" onClick={this.runExample2}>CHANGE THE STUPID STORED VALUE TO 1337</Button>

          <Button variant="danger" onClick={this.runSignNounce}>Sign nounce 123</Button>
      </div>

    );
  }
}

export default App;
