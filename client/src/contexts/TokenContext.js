import React, {Component, createContext} from 'react';

export const TokenContext = createContext();

class TokenContextProvider extends Component {
    state = {
        accessToken: false,
        refreshToken: false
    };

    setAccessToken = (token) => {
        this.setState({accessToken: token});
    };
    setRefreshToken = (token) => {
        this.setState({refreshToken: token});
    };
    render(){
        return (
            <TokenContext.Provider value={{...this.state, setAccessToken: this.setAccessToken, setRefreshToken: this.setRefreshToken}}>
                {this.props.children}
            </TokenContext.Provider>
        );
    }
}

export default TokenContextProvider;