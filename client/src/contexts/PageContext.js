import React, {Component, createContext} from 'react';

export const PageContext = createContext();

class PageContextProvider extends Component {
    state = {
        page: "My Garden"
    };

    setPage = (page) => {
        this.setState({page: page});
    };

    render(){
        return (
            <PageContext.Provider value={{...this.state, setPage: this.setPage}}>
                {this.props.children}
            </PageContext.Provider>
        );
    }
}

export default PageContextProvider;