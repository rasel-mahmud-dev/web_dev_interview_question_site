import { render } from 'preact';

import React from 'preact/compat';

import { PureComponent } from 'preact/compat';
import connect, {AuthState, Provider} from "./store/connect";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import Router, {Route} from "preact-router";


import "./styles.scss"

import api from "./apis";
import {ActionTypes} from "./store/types";

import { createHashHistory } from 'history';

// import LoginPage from "./pages/LoginPage";

import AsyncRoute from "preact-async-route";
import HelixCssLoader from "./components/HelixCSSLoader/HelixCSSLoader";

function MyLoadingComponent(){
  return (
    <div className="loader_root"><HelixCssLoader /></div>
  )
}

interface StateType{}
interface PropsType{
  actions: {
    dispatch: (actionData: any)=> void
  },
  authState: null | AuthState
}

class App extends PureComponent<PropsType, StateType> {
  
  componentDidMount() {
  
    api.get("/api/fetch-login").then(res=>{
      this.props.actions.dispatch({
        type: ActionTypes.LOGIN,
        payload: res.data
      })
    })
      .catch(ex=>{
        console.log(ex)
      })
  
    
    let html = document.getElementById("html")
    let theme = window.localStorage.getItem("theme")
    html.setAttribute("data-theme", theme)
    this.props.actions.dispatch({
      type: ActionTypes.TOGGLE_THEME,
      payload: theme
    })
    
    
  }
  
  
  render(props) {

    return (
      <div>
        <Navigation />
        <div class="spacer"/>
        <div className="container">
    
          
          {/* @ts-ignore*/}
          <Router history={createHashHistory()} >
            
            <Route index={true} path="/" component={HomePage} />
            
            <AsyncRoute
              path="/login"
              getComponent={() => import('./pages/LoginPage').then(module => module.default).catch(err=>{})}
              loading={MyLoadingComponent}
            />
            
            <AsyncRoute
              path="/registration"
              getComponent={() => import('./pages/RegistrationPage').then(module => module.default).catch(err=>{})}
              loading={MyLoadingComponent}
            />
             
             <AsyncRoute
              path="/:category_slug/:slug"
              getComponent={() => import('./pages/PostDetail').then(module => module.default).catch(err=>{})}
              loading={MyLoadingComponent}
            />
            
            <AsyncRoute
              index={true}
              path="/add-post"
              getComponent={() => this.props.authState
                ? import('./pages/AddPost').then(module => module.default).catch(err=>{})
                : import('./pages/LoginPage').then(module => module.default).catch(err=>{})}
              loading={MyLoadingComponent}
            />
            
            <AsyncRoute
              index={true}
              path="update-post/:slug"
              getComponent={() => this.props.authState
                ? import('./pages/AddPost').then(module => module.default).catch(err=>{})
                : import('./pages/LoginPage').then(module => module.default).catch(err=>{})}
              loading={MyLoadingComponent}
            />
            
            <AsyncRoute
              index={true}
              path="/admin"
              getComponent={() => this.props.authState && this.props.authState.role === "admin"
                ? import('./pages/AdminPage').then(module => module.default).catch(err=>{})
                : import('./pages/LoginPage').then(module => module.default).catch(err=>{})}
              loading={MyLoadingComponent}
            />
              
            {/*<Route index={true} path="/:category_slug/:slug" component={PostDetail} />*/}
          </Router>
        </div>
      </div>
    )
  }
}

let WithProvider = Provider(connect(App))

const dom = document.getElementById('root');
render( <WithProvider/>, dom);
