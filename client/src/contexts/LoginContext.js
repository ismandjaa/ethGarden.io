import React, {Component, createContext} from 'react';

export const LoginContext = createContext();

class LoginContextProvider extends Component {
    state = {
        isLoggedIn: false,
        spinner: false,
        accessToken: false,
        refreshToken: false,
        page: "My Garden"
    };

    toggleLoginTrue = () => {
        this.setState({isLoggedIn: true});
    };
    toggleLoginFalse = () => {
        this.setState({isLoggedIn: false});
    };
    toggleSpinnerTrue = () => {
        this.setState({spinner: true});
    };
    toggleSpinnerFalse = () => {
        this.setState({spinner: false});
    };
    setAccessToken = (token) => {
        this.setState({accessToken: token});
    };
    setRefreshToken = (token) => {
        this.setState({refreshToken: token});
    };
    setPage = (page) => {
        this.setState({page: page});
    };
    render(){
        return (
            <LoginContext.Provider value={{...this.state, toggleLoginTrue: this.toggleLoginTrue, toggleLoginFalse: this.toggleLoginFalse, toggleSpinnerTrue: this.toggleSpinnerTrue, toggleSpinnerFalse: this.toggleSpinnerFalse, setAccessToken: this.setAccessToken, setRefreshToken: this.setRefreshToken, setPage: this.setPage }}>
                {this.props.children}
            </LoginContext.Provider>
        );
    }
}

export default LoginContextProvider;