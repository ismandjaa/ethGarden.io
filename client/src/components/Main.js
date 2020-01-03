import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Shop from './Shop'
import Welcome from './Welcome'
import Login from './Login'
import Help from './Help'
import Achievements from './Achievements'
import Navbar from './Navbar'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>

        <Switch>
            <Route exact path='/' component={Achievements}/>
            <Route exact path='/Shop' component={Shop}/>
            <Route exact path='/Home' component={Home}/>
            <Route exact path='/Login' component={Login}/>
            <Route exact path='/Help' component={Help}/>
            <Route exact path='/Achievements' component={Achievements}/>

            // add more routes here
        </Switch>
    </main>
);

export default Main
