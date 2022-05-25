import { render } from 'preact';
import React from 'preact/compat';
import { PureComponent } from 'preact/compat';
import connect, {Provider} from "./store/connect";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import Router, {Route} from "preact-router";
import PostDetail from "./pages/PostDetail";
import AddPost from "./pages/AddPost";

import "./styles.scss"
import LoginPage from "./pages/LoginPage";
import api from "./apis";
import {ActionTypes} from "./store/types";

import { createHashHistory } from 'history';

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
  }
  
  
  render(props) {
    
    return (
      <div>
        <Navigation />
        <div class="spacer"/>
        <div className="container">
          <Router history={createHashHistory()}>
            <Route index={true} path="/" component={HomePage} />
            <Route index={true} path="/about" component={HomePage} />
            <Route index={true} path="/login" component={LoginPage} />
            <Route index={true} path="/add-post" component={AddPost} />
            <Route index={true} path="/update-post/:slug" component={AddPost} />
            <Route index={true} path="/:category_slug/:slug" component={PostDetail} />
          </Router>
        </div>
      </div>
    )
  }
}

let WithProvider = Provider(connect(App))

const dom = document.getElementById('root');
render( <WithProvider/>, dom);
