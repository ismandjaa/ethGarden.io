import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import getWeb3 from "../utils/getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage";

class Shop extends Component {


    render() {
        return (

            <div style={{}} className="Shop">

                <div style={{
                    position: 'absolute', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h1>Shop</h1>
                    <p>
                        Welcome to the ethgarden shop!
                    </p>

                    <Button variant="outline-primary"   >Buy Plant</Button><Button variant="outline-primary"   >Refund Plant</Button><Button variant="outline-primary"   >boom</Button>

                </div>
            </div>

        );
    }
}
export default Shop;