
import "./styles.scss"
import api from "../apis";

import {Link, route} from 'preact-router';
import React from "preact/compat";
import {useState} from "preact/hooks";
import connect from "../store/connect";
import InputGroup from "../components/InputGroup";
import {ActionTypes} from "../store/types";
import SweetAlert from "./SweetAlert";
import errorMessage from "../response/errorResponse";


const RegistrationPage = (props)=>{
  const [message, setMessage] = React.useState("")
  const [userData, setUser]  = useState({
    username: "",
    email :"",
    password: ""
    
  })
  
  
  function handleChange(e){
    setUser({...userData, [e.target.name]: e.target.value})
  }
  
  
  function handleRegister(e){
    e.preventDefault();
    setMessage("")
    if(userData.email && userData.password){
        api.post("/api/registration", {
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

      
      <form onSubmit={handleRegister} className="add-post-form">
  
        <h1>Create a Account</h1>
  
        <SweetAlert onClose={()=>setMessage("")} message={message} />
        
        <InputGroup label="Username" value={userData.username} name="username" onChange={handleChange} />
        <InputGroup label="Email" value={userData.email} name="email" onChange={handleChange} />
        <InputGroup
          label="Password"
          value={userData.password}
          type="password"
          name="password"
          onChange={handleChange}
        />
        <h4 className="label"><span>Already have an account ? <Link href="/login">Login page</Link> </span></h4>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}


export default connect(RegistrationPage)