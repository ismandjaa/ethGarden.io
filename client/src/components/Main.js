import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Shop from './Shop'
import Welcome from './Welcome'
import Login from './Login'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Welcome}/>
            <Route exact path='/Shop' component={Shop}/>
            <Route exact path='/Home' component={Home}/>
            <Route exact path='/Login' component={Login}/>

            // add more routes here
        </Switch>
    </main>
);

export default Main
