
export enum ActionTypes {
  FETCH_SIDEBAR_DATA= "FETCH_SIDEBAR_DATA",
  FETCH_POST = "FETCH_POST",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  TOGGLE_THEME = "TOGGLE_THEME",
  SET_UPDATE_POST = "SET_UPDATE_POST",
  SET_POST = "SET_POST",
  DELETE_POST = "DELETE_POST",
}

export interface Post {
  title: string,
  __v: string,
  created_at?: Date,
  slug: string,
  summary: string,
  category_slug: string,
  content: string,
  is_public: boolean
}

export interface User {
  username: string,
  avatar?: string
  password?: string
  email: string,
  role: string
}