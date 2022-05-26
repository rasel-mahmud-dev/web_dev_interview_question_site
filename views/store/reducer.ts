import {ActionTypes} from "./types";


export function postReducer(state, action){
  switch (action.type){
    
    case ActionTypes.FETCH_SIDEBAR_DATA :
      state = {
        ...state,
        sidebarData: action.payload
      }
      return state;
      
    case ActionTypes.FETCH_POST :
      state = {
        ...state,
        post: action.payload
      }
      return state;
      
    case ActionTypes.FETCH_CATEGORIES :
      state = {
        ...state,
        categories: action.payload
      }
      return state;
      
    default:
      return  state
  }
}

export function authReducer(state, action){
  switch (action.type){
    case ActionTypes.LOGIN :
      state = {
        ...action.payload
      }
      return state;
      
    case ActionTypes.LOGOUT :
      state = action.payload
      
      return state;
      
    default:
      return  state
  }
}


export function appReducer(state, action){
  switch (action.type){
    case ActionTypes.TOGGLE_THEME :
      state = {
        ...state,
        theme: action.payload
      }
      return state;
      
      
    default:
      return  state
  }
}

