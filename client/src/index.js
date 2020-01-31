
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import Ethgarden from "./components/Ethgarden";
import LoginContextProvider from "./contexts/LoginContext";


//ReactDOM.render(<Router><App />,document.getElementById('root')</Router>);

ReactDOM.render((<Router><LoginContextProvider><Ethgarden /></LoginContextProvider></Router>),document.getElementById('root'));

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
