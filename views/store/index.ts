//
//
// const store = {
//   state: {
//     post: null,
//     pathname: false,
//     sidebarData: {}
//   },
//   oldState: {},
//
//   init: function(){
//     this.oldState = this.state
//   },
//
//   getState: function (){
//     return this.state
//   },
//
//   subscribe: function (name, cb){
//     if(this.listeners.findIndex(cb=>cb.name === name) === -1) {
//       this.listeners.push({name: name, fn: cb})
//     }
//   },
//   listeners: [],
//
//   dispatch: function (data: {type, payload, cb?: any}){
//     if(data.type === "FETCH_POST"){
//       this.state = {
//         ...this.state,
//         post: data.payload
//       }
//
//     } else if(data.type === "CHANGE_PAGE"){
//       this.state = {
//         ...this.state,
//         pathname: data.payload
//       }
//
//     } else if(data.type === "FETCH_SIDEBAR_DATA"){
//       this.state = {
//         ...this.state,
//         sidebarData: data.payload
//       }
//     }
//
//     this.listeners.forEach(listener=> {
//       listener.fn && listener.fn(this.getState())
//       this.oldState = this.state
//     })
//   }
// }
// export default store

import {createContext} from "preact";

export const AppContext = createContext({})

export const AuthContext = createContext({})

