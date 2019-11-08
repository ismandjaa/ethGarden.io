import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
class About extends Component {

    render() {
        return (

            <div style={{}} className="About">

                <div style={{
                    position: 'absolute', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h1>About</h1>
                    <p>
                        React router is currently routing to About.js
                    </p>
                </div>
            </div>

        );
    }
}
export default About;