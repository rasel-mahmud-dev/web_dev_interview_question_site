
import "./styles.scss"
import api from "../apis";
import store from "../store";

import React from "preact/compat";
import {useEffect, useState} from "preact/hooks";
import connect from "../store/connect";
import { Link } from "preact-router";
import InputGroup from "../components/InputGroup";
import {ActionTypes} from "../store/types";


const Login = (props)=>{
  
  const [userData, setUser]  = useState({
    email :"rasel.mahmud.dev@gmail.com",
    password: "123"
  })
  
  useEffect( ()=>{
    
    (async function (){
      try {
        let response = await api.post("/api/sidebar_data")
        
        if(response.status === 200) {
          props.actions.dispatch({
            type: "FETCH_SIDEBAR_DATA",
            payload: response.data.sidebarData
          })
        }
      } catch (ex) {
        console.log(ex)
      }
    }())
    
  }, [])
  
  
  function handleChange(e){
    setUser({...userData, [e.target.name]: e.target.value})
  }
  
  
  function handleLogin(e){
    e.preventDefault();
    if(userData.email && userData.password){
        api.post("/api/login", {
          ...userData
        }).then(res=>{
          if(res.status === 201){
            props.actions.dispatch({
              type: ActionTypes.LOGIN,
              payload: res.data
            })
          }
        }).catch(ex=>{
          console.log(ex)
        })
    } else {
      console.log("alert")
    }
  }
  
  
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin} className="add-post-form">
        <InputGroup label="Email" value={userData.email} name="email" onChange={handleChange} />
        <InputGroup label="Password" value={userData.password} type="password" name="password" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}


export default connect(Login)