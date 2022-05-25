
export enum ActionTypes {
  FETCH_SIDEBAR_DATA= "FETCH_SIDEBAR_DATA",
  FETCH_POST = "FETCH_POST",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  ADD_POST = "ADD_POST",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface Post {
  title: string,
  __v: string,
  created_at?: Date,
  slug: string,
  summary: string,
  category_slug: string,
  content: string
}

export interface User {
  username: string,
  avatar?: string
  password?: string
  email: string,
  role: string
}