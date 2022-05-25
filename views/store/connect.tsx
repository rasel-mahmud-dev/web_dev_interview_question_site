import React, {PureComponent} from 'preact/compat';

import { AppContext, AuthContext } from './index';


import {appReducer, authReducer} from "./reducer"



export const Provider = (APP)=> {
  
  return class extends PureComponent {
    
    constructor(props) {
      super(props);
      
      this.state  = {
        postState: {
          post: null,
          sidebarData: {},
        },
        authState: null
      }
      
      this.actions = {
        dispatch: (action: {type: string, payload: any})=>{
          let a = appReducer(this.state.postState, action)
          let b = authReducer(this.state.authState, action)
          let updatedState = {...this.state, postState: a, authState:  b}
          this.setState({...this.state, ...updatedState})
        }
      }
      
    }
    
    
    
    render(){
      return (
        <AppContext.Provider value={{postState: this.state.postState, actions: this.actions }}>
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
                <HOC {...props} authState={authState} postState={value.postState} actions={value.actions} />
              )
            }}
          </AuthContext.Consumer>
        ))}
      </AppContext.Consumer>
    )
  }
}

export default connect
