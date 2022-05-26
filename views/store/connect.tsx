import React, {PureComponent} from 'preact/compat';

import { AppContext, AuthContext } from './index';


import {appReducer, authReducer, postReducer} from "./reducer"



export const Provider = (APP)=> {
  
  return class extends PureComponent {
    
    constructor(props) {
      super(props);
      
      this.state  = {
        postState: {
          post: null,
          sidebarData: {},
        },
        authState: null,
        appState: {
          theme: "light" // "dark"
        }
      }
      
      this.actions = {
        dispatch: (action: {type: string, payload: any})=>{
          let updatedState = {
            ...this.state,
            postState: postReducer(this.state.postState, action),
            authState: authReducer(this.state.authState, action),
            appState: appReducer(this.state.appState, action),
          }
          this.setState({...this.state, ...updatedState})
        }
      }
      
    }
    
    
    
    render(){
      return (
        <AppContext.Provider value={{postState: this.state.postState, appState: this.state.appState, actions: this.actions }}>
          <AuthContext.Provider value={this.state.authState}>
            <APP {...this.props} />
          </AuthContext.Provider>
        </AppContext.Provider>
      )
    }
  }
}


const connect = (HOC)=>{
  return function (props){
    return (
      <AppContext.Consumer>
        {((value) =>  (
          <AuthContext.Consumer>
            {(authState)=>{
              return (
                <HOC {...props} authState={authState} appState={value.appState} postState={value.postState} actions={value.actions} />
              )
            }}
          </AuthContext.Consumer>
        ))}
      </AppContext.Consumer>
    )
  }
}

export default connect
