
import "./styles.scss"
import api from "../apis";
import { route } from 'preact-router';
import React from "preact/compat";
import { useState} from "preact/hooks";
import connect from "../store/connect";
import { Link } from "preact-router";
import InputGroup from "../components/InputGroup";
import {ActionTypes} from "../store/types";
import SweetAlert from "./SweetAlert";
import errorMessage from "../response/errorResponse";


const Login = (props)=>{
  const [message, setMessage] = React.useState("")
  const [userData, setUser]  = useState({
    email :"rasel.mahmud.dev@gmail.com",
    password: "123"
  })
  
  
  function handleChange(e){
    setUser({...userData, [e.target.name]: e.target.value})
  }
  
  
  function handleLogin(e){
    e.preventDefault();
    setMessage("")
    if(userData.email && userData.password){
        api.post("/api/login", {
          ...userData
        }).then(res=>{
          if(res.status === 201){
            props.actions.dispatch({
              type: ActionTypes.LOGIN,
              payload: res.data
            })
            let go = "/"
            if(props.callback){
              go = props.callback
            }
            route(go, true);
          }
        }).catch(ex=>{
          setMessage(errorMessage(ex))
        })
    } else {
      setMessage("Please Provide user information")
    }
  }
  
  
  return (
    <div>
      
      <form onSubmit={handleLogin} className="add-post-form">
  
        <h1>Login Page</h1>
  
        <SweetAlert onClose={()=>setMessage("")} message={message} />
        
        <InputGroup label="Email" value={userData.email} name="email" onChange={handleChange} />
        <InputGroup label="Password" value={userData.password} type="password" name="password" onChange={handleChange} />
        <h4 className="label"><span>Not a account ? <Link href="/registration">Create a account</Link> </span></h4>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}


export default connect(Login)