import "./styles.scss"
import * as React from "preact/compat";
import connect from "../store/connect";
import {useEffect, useState} from "preact/hooks";
import {ActionTypes, Post} from "../store/types";
import api from "../apis";
import InputGroup from "../components/InputGroup";




const AddPost = (props)=>{
  
  const {categories} = props.postState
  
  
  const [post, setPost] = useState<Post>({
    category_slug: "",
    __v: "",
    created_at: undefined,
    title: "",
    slug: "",
    summary: "",
    content: ""
  })
  
  useEffect(()=>{
   
    if(!props.slug) {
      
      (async function () {
      
        try {
          let response = await api.get("/api/categories")
          if (response.status === 200) {
            props.actions.dispatch({
              type: ActionTypes.FETCH_CATEGORIES,
              payload: response.data
            })
          }
        } catch (ex) {
          alert(ex.message)
        }
    
      }())
    }
    
  }, [])
  
  
  useEffect(()=>{
    if(props.slug) {
      (async function () {
    
        try {
          let response = await api.post("/api/post", {slug: props.slug})
          if (response.status === 200) {
        
            let response2 = await api.get("/api/categories")
            if (response2.status === 200) {
              props.actions.dispatch({
                type: ActionTypes.FETCH_CATEGORIES,
                payload: response2.data
              })
            }
        
            setPost({...response.data})
          }
      
      
        } catch (ex) {
          alert("updated post fetch fail..")
        }
    
      }())
    }
  }, [props.slug])
  
  
  function handleChange(e){
    setPost({
      ...post,
      [e.target.name]: e.target.value
    })
  }
  
  
  function savePost(e){
    e.preventDefault();
    
    
    if(props.path  === "/add-post"){
    
    } else {
  
      console.log(post)
      
      if(post){
        const { __v, created_at, ...data} = post
        let inComplete = ""
        let isFilled = true
        for (let postKey in data) {
          if(!data[postKey]) {
            inComplete = postKey
            isFilled = false
          }
        }
        
        if(isFilled){
          api.post("/api/update-post", {...data}).then(response => {
            if(response.status === 201){
              alert("post updated" )
            }
          }).catch(ex => {
            console.log(ex.message)
          })
        } else {
          alert("Please provide " + inComplete )
        }
        
      }
      
    }
    
  }
  
  
  return (
    <div>


      <form onSubmit={savePost}  className="add-post-form">
        
        <h1> { props.path  === "/add-post" ? "Add Post" : "Update Post"}</h1>
    
        
        <InputGroup
          label="Post Title"
          value={post.title}
          name="title"
          type="text"
          placeholder="Post title"
          onChange={handleChange}
        />
        
        {/*<InputGroup*/}
        {/*  label="Post Summary"*/}
        {/*  value={post.summary}*/}
        {/*  name="summary"*/}
        {/*  type="text"*/}
        {/*  placeholder="Post Summary"*/}
        {/*  onChange={handleChange}*/}
        {/*/>*/}
        
    
          <div className="input-group">
            <label>Post Category</label>
            <select onChange={handleChange} value={post.category_slug} name="category_slug">
              { categories && categories.length > 0 && categories.map(cat=>(
                <option value={cat.slug}>{cat.name}</option>
              )) }
            </select>
          </div>
    
          <div className="input-group">
            <label>Post Summary</label>
            <textarea onChange={handleChange} value={post.summary} name="summary"  placeholder="Content">{post.summary}</textarea>
          </div>
        
        <div className="input-group">
            <label>Post Content</label>
            <textarea onChange={handleChange} value={post.content} name="content"  placeholder="Content"> {post.content} </textarea>
          </div>
        
          <div className="input-group">
            <button type="submit" className="btn btn-primary">{ props.path  === "/add-post" ? "Add Post" : "Update"}</button>
          </div>
      </form>
    </div>
    
  )
}

export default connect(AddPost)