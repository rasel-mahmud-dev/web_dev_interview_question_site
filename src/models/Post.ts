import {rejects} from "assert";

import Base from "./Base";

export interface PostType{
  post_id: string
  title: string
  category_id: number
  category_name?: string
  slug: string
  cover?: string
  path?: string
  author_id: number
  tags: string
  created_at: string
}


export default class Post extends Base{
  private post_id: string
  private title: string
  private category_id: number
  private category_name?: string
  private slug: string
  private cover?: string
  private path?: string
  private author_id: number
  private tags: string
  private created_at: string

  constructor() {
    super();
  }
  

}
