import "./styles.scss"
import * as React from "preact/compat";
import connect from "../store/connect";
import {useEffect, useRef, useState} from "preact/hooks";
import {ActionTypes, Post} from "../store/types";
import api from "../apis";
import InputGroup from "../components/InputGroup";
import errorMessage from "../response/errorResponse";
import SweetAlert from "./SweetAlert";
import slugify from "../../src/utils/slugify";



const AddPost = (props)=>{
  
  const [message, setMessage] = React.useState("")
  
  const {categories} = props.postState
  
  
  const [post, setPost] = useState<Post>({
    category_slug: "",
    __v: "",
    created_at: undefined,
    title: "",
    slug: "",
    summary: "",
    content: "",
    is_public: false
  })
  
  const [categoryName, setCategoryName] = React.useState("")
  
  const mdEditor = useRef()
  
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
            if(mdEditor.current) {
              mdEditor.current.innerText = response.data.content
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
    if(e.target.type === "checkbox"){
      setPost({
        ...post,
        [e.target.name]: e.target.checked
      })
    } else {
      if(e.target.contentEditable){
        setPost({
          ...post,
          content: e.target.outerText
        })
      } else {
        setPost({
          ...post,
          [e.target.name]: e.target.value
        })
      }
    }
  }
  
  
  function saveCategory(e) {
    e.preventDefault();
    setMessage("")
  
    if(!props.authState){
      setMessage("Please login first")
      return
    }
    
    if(!categoryName){
      setMessage("Category Name Required.")
      return
    }
    
    api.post("/api/add-category", {categoryName: categoryName}).then(response => {
      if(response.status === 201){
        props.actions.dispatch({
          type: ActionTypes.FETCH_CATEGORIES,
          payload: [...props.postState.categories, response.data]
        })
      }
    }).catch(ex => {
      setMessage(errorMessage(ex))
    })
  }
  
  
  
  function savePost(e){
    e.preventDefault();
    setMessage("")
    
    if(!props.authState){
      setMessage("Please login first")
      window.localStorage.setItem("state", JSON.stringify(post))
      return
    }
  
    let posts = null
    try {
      posts = JSON.parse(localStorage.getItem("posts"))
    } catch (ex){
    
    }
    
    if(props.path  === "/add-post"){
      const { __v, created_at, _id, is_public, author_id, slug, ...data} = post
      let inComplete = ""
      let isFilled = true
      for (let postKey in data) {
        if(!data[postKey]) {
          inComplete = postKey
          isFilled = false
        }
      }
  
      if(isFilled){
        api.post("/api/add-post", {
          ...data,
          is_public: post.is_public,
          slug: slugify(data.title),
          author_id: props.authState._id
        }).then(response => {
          if(response.status === 201){
            setMessage("post has been saved")
            props.actions.dispatch({
              type: ActionTypes.SET_POST,
              payload: response.data
            })
            
            if(posts){
              posts.push(response.data)
            } else {
              posts = [response.data]
            }
            localStorage.setItem("posts", JSON.stringify(posts))
            
            localStorage.removeItem("state")
          }
        }).catch(ex => {
          setMessage(errorMessage(ex))
        })
      } else {
        setMessage("Please provide " + inComplete )
      }
      
    } else {
      if(post){
        const { __v, created_at, is_public, ...data} = post
        let inComplete = ""
        let isFilled = true
        for (let postKey in data) {
          if(!data[postKey]) {
            inComplete = postKey
            isFilled = false
          }
        }
        
        if(isFilled){
          api.post("/api/update-post", {
            ...data,
            is_public: post.is_public,
            slug: slugify(data.title)
          }).then(response => {
            if(response.status === 201){
              setMessage("post has been updated")
              props.actions.dispatch({
                type: ActionTypes.SET_UPDATE_POST,
                payload: response.data
              })
              localStorage.removeItem("state")
             
              /// already exists posts on localstorage
              if(posts){
                let updatedPostIndex = posts.findIndex(post=>post.slug === response.data.slug)
                if(updatedPostIndex !== -1){
                  posts[updatedPostIndex] =  {
                    ...posts[updatedPostIndex],
                    ...response.data,
                  }
                } else {
                  posts.push(response.data)
                }
              } else {
                posts = [response.data]
              }
              localStorage.setItem("posts", JSON.stringify(posts))
            }
          }).catch(ex => {
            setMessage(errorMessage(ex))
          })
        } else {
          setMessage("Please provide " + inComplete )
        }
      }
    }
  }
  
  function handleRestoreFields(){
    let localState = localStorage.getItem("state")
    if(localState){
      try{
        let s = JSON.parse(localState)
        setPost({...post, ...s})
      } catch (ex){}
    } else {
      setMessage("No found save post fields")
    }
  }
  
  
  return (
    <div>
      
      <SweetAlert onClose={()=>setMessage("")} message={message} />
      

      <form onSubmit={savePost}  className="add-post-form max-w-full">
        
        <div className="flex justify-between align-center">
          <h1> { props.path  === "/add-post" ? "Add Post" : "Update Post"}</h1>
          <button type="button" onClick={handleRestoreFields} className="btn btn-primary">Restore Fields</button>
        </div>
        
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
        
          <div className="input-group checkbox-group">
            <input onChange={handleChange} id="isPublic" type="checkbox" name="is_public" checked={post.isPublic} />
            <label htmlFor="isPublic">is public</label>
          </div>
        
        <div className="input-group">
            <label>Post Content</label>
            <div
              ref={mdEditor}
              onInput={handleChange}
              contentEditable={true}
              name="content"
              id="autoResizing"
              className="content_edit_mode mdEditor"
            >

              {post.content}
            </div>
          </div>
        
          <div className="input-group">
            <button type="submit" className="btn btn-primary">{ props.path  === "/add-post" ? "Add Post" : "Update"}</button>
          </div>
      </form>
  
      
      <form onSubmit={saveCategory}  className="add-post-form">
    
        <h1>Add a Category</h1>
    
    
        <InputGroup
          label="Category Name"
          value={categoryName}
          type="text"
          placeholder="Name"
          onChange={(e)=>setCategoryName(e.target.value)}
         name="category-name"/>
        <button className="btn btn-primary">Add A Category</button>
      </form>

    </div>
    
  )
}

export default connect(AddPost)