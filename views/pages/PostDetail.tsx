import "./styles.scss"
import React from "preact/compat";
import {useEffect, useRef, useState} from "preact/hooks";
import api from "../apis";
import connect from "../store/connect";
import { marked } from 'marked';

import "../scss/hljs.scss";
import SweetAlert from "./SweetAlert";
import errorMessage from "../response/errorResponse";


function PostDetail(props) {
  
  const {post} = props.postState

  const [message, setMessage] = React.useState("")
  
  const textAreaRef = useRef()
  
  const [changeMdRow, setChangeMdRow] = React.useState("")
  
  const [mode, setMode] = useState<"edit" | "preview" | "">("")

  
  function fetchPost(category_slug, slug){
    return new Promise( ( async (resolve, reject) => {
      try {
        let response = await api.post("/api/post", {
          category_slug: category_slug,
          slug: slug,
        })
        if (response.status === 200) {
          let html = marked.parse(response.data.content)
          let post = response.data
          props.actions.dispatch({
            type: "FETCH_POST",
            payload: post
          })
          let md = document.getElementById("preview-md")
          md.innerHTML = `<pre>${html}</pre>`
          setChangeMdRow(post.content)
          resolve(post)
        }
      } catch (ex){
        resolve(false)
      }
    }))
  }
  
  
  useEffect(()=>{
  
    async function load(){
      try {
        let posts = null
        try{
          posts = JSON.parse(localStorage.getItem("posts"))
        } catch (ex){
          console.log(ex)
        }
        if(posts){
          let index = posts.findIndex(post=>post.slug ===  props.slug)
          if(index !== -1) {
            //  post exist inside localStorage posts array
            
            let post = posts[index]
            let html = marked.parse(post.content)
            props.actions.dispatch({
              type: "FETCH_POST",
              payload: post
            })
            let md = document.getElementById("preview-md")
            md.innerHTML = `<pre>${html}</pre>`
            setChangeMdRow(post.content)
          } else{
            //  post not exist inside localStorage posts array
            let post = await fetchPost(props.category_slug, props.slug)
            posts.push(post)
            localStorage.setItem("posts", JSON.stringify(posts))
          }
        } else {
          let post = await fetchPost(props.category_slug, props.slug)
          localStorage.setItem("posts", JSON.stringify([post]) )
        }
      } catch (ex){
        setMessage(errorMessage(ex))
      }
    }
    load()
  
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code: any, lang: any) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })
    
  
  }, [])
  
  useEffect(()=>{
    if(mode === "edit"){
      let textArea = textAreaRef.current as HTMLTextAreaElement
      if(textArea) {
        textArea.innerText = changeMdRow
      }
    }
    
  }, [mode])
  
  function makeContentEditable(){
    setChangeMdRow(post.content)
    setMode("edit")
  }
  
  function handleDiscard(){
    setMode("")
  }
  
  function saveOnDatabase(){
    if(!props.authState){
      setMessage("Please login first")
      return
    }
    
    if(changeMdRow) {
      api.post("/api/update-post", {content: changeMdRow, _id: post._id}).then(response => {
        if(response.status === 201){
          setMode("")
          const previewMD = document.getElementById("preview-md")
          previewMD.innerHTML = `
            <pre>${marked.parse(changeMdRow)}</pre>
          `
  
          let posts = null
          try {
            posts = JSON.parse(localStorage.getItem("posts"))
          } catch (ex) {
          }
  
          if(posts){
            let updatedPostIndex = posts.findIndex(post=>post._id ===  post._id)
            if(updatedPostIndex !== -1){
              posts[updatedPostIndex] =  {
                ...posts[updatedPostIndex],
                content: changeMdRow,
              }
            } else {
              posts.push({
                ...post,
                content: changeMdRow
              })
            }
          } else {
            posts = [{
              ...post,
              content: changeMdRow
            }]
          }
          localStorage.setItem("posts", JSON.stringify(posts))
          
        }
      }).catch(ex => {
        setMessage(errorMessage(ex))
      })
    } else {
      setMessage("please make some change")
    }
  }
  
  function previewChange(){
    
    const previewMD = document.getElementById("preview-md")
    
    if(mode === "preview") {
      setMode("edit")
      if(textAreaRef.current){
        textAreaRef.current.innerText = changeMdRow
      }
      
    } else {
      setMode("preview")
      previewMD.innerHTML = `
        <pre>${marked.parse(changeMdRow)}</pre>
      `
    }
  }
  
  function changeContentInput(e) {
    setChangeMdRow(e.target.outerText)
  }
  

  return (
			<div className="relative">
        
        <SweetAlert onClose={()=>setMessage("")} message={message} />
        
        <div className="action_icons__root">
        <div className="action_icons flex">
          { mode === "" && <svg onClick={makeContentEditable} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>}
          {mode === "edit" && <svg onClick={handleDiscard} className="icon times-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>}
          
          { mode === "preview" ?
            <svg onClick={previewChange}  className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/></svg>
            : mode === "edit" ? <svg onClick={previewChange}  className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/></svg>: ""
          }
          
          {(mode === "edit" || mode === "preview") && <svg onClick={saveOnDatabase} className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>}

        </div>
        </div>
        
        <div id="post_details">
          
          { post && (
            <div>
              <h1>{post.title}</h1>
              {/*<p>{post.summary}</p>*/}
            </div>
          ) }
          
          <div
            ref={textAreaRef}
            contentEditable={true}
            onInput={changeContentInput}
            id="autoResizing"
            className={["content_edit_mode mdEditor", mode === "edit" ? "block": "none"].join(' ')}
          />
         
           <div id="preview-md" class={[(mode !== "edit" ||  mode === "preview" ) ? "block": "none"].join(" ")}/>
          
        </div>
			</div>
	)
}


export default connect(PostDetail)