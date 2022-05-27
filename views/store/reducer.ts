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
      
    case ActionTypes.SET_UPDATE_POST :
      state = {
        ...state,
        categories: action.payload
      }
      return state;
      
    case ActionTypes.DELETE_POST :
      let updateSidebarDataCategories = {...state.sidebarData}
      let posts = updateSidebarDataCategories[action.payload.category_slug]
    
      if(posts){
        posts = posts.filter(post=>post._id !== action.payload.post_id)
      }
      state.sidebarData = posts
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

