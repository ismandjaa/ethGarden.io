import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
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
                        React router is currently routing to Shop.js
                    </p>
                </div>
            </div>

        );
    }
}
export default Shop;