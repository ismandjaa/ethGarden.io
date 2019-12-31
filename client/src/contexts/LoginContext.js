import React, {Component, createContext} from 'react';

export const LoginContext = createContext();

class LoginContextProvider extends Component {
    state = {
        isLoggedIn: false
    };

    toggleLoginTrue = () => {
        this.setState({isLoggedIn: true});
    };
    toggleLoginFalse = () => {
        this.setState({isLoggedIn: false});
    };
    render(){
        return (
            <LoginContext.Provider value={{...this.state, toggleLoginTrue: this.toggleLoginTrue, toggleLoginFalse: this.toggleLoginFalse}}>
                {this.props.children}
            </LoginContext.Provider>
        );
    }
}

export default LoginContextProvider;