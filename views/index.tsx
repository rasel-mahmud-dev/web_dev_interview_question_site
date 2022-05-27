import { render } from 'preact';

import React from 'preact/compat';

import { PureComponent } from 'preact/compat';
import connect, {Provider} from "./store/connect";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import Router, {Route} from "preact-router";

import LazyRoute from 'preact-lazy-route';


import "./styles.scss"

import api from "./apis";
import {ActionTypes} from "./store/types";

import { createHashHistory } from 'history';

// import LoginPage from "./pages/LoginPage";

import AsyncRoute from "preact-async-route";


function MyLoadingComponent(){
  return (
    <div>
      <h1 className="text-center">Loading...</h1>
    </div>
  )
}

class App extends PureComponent {
  
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
          <Router history={createHashHistory()} >
            
            <Route index={true} path="/" component={HomePage} />
            
            <AsyncRoute
              path="/login"
              getComponent={() => import('./pages/LoginPage').then(module => module.default)}
              loading={MyLoadingComponent}
            />
            
            <AsyncRoute
              path="/registration"
              getComponent={() => import('./pages/RegistrationPage').then(module => module.default)}
              loading={MyLoadingComponent}
            />
             
             <AsyncRoute
              path="/:category_slug/:slug"
              getComponent={() => import('./pages/PostDetail').then(module => module.default)}
              loading={MyLoadingComponent}
            />
            
              <LazyRoute
                index={true}
                path="/add-post"
                component={() => import('./pages/AddPost')}
                loading={MyLoadingComponent}
              />
              
              <LazyRoute
                index={true}
                path="update-post/:slug"
                component={() => import('./pages/AddPost')}
                loading={MyLoadingComponent}
              />
              
              <LazyRoute
                index={true}
                path="/:category_slug/:slug"
                component={() => import('./pages/PostDetail')}
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
