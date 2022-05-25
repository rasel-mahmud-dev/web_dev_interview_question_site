
import "./styles.scss"
import React from "preact/compat";
import {useEffect, useRef, useState} from "preact/hooks";
import store from "../store";
import api from "../apis";
import connect from "../store/connect";
import { Link } from "preact-router";
import { marked } from 'marked';

function PostDetail(props) {
  
  const {post} = props.postState

  const [markdown, setMarkdown]  = useState("")
  
  const [changeMdRow, setChangeMdRow] = React.useState("")
  
  const ref = useRef<HTMLDivElement>(null)

  const [mode, setMode] = useState("")
  const [isPreview, setPreview] = useState(false)
  
  
  useEffect(()=>{
    async function load(){
      try {
        let response = await api.post("/api/post", {
          category_slug: props.category_slug,
          slug: props.slug,
        })
        if(response.status === 200){
          setMarkdown(marked.parse(response.data.content))
          props.actions.dispatch({
            type: "FETCH_POST",
            payload: response.data
          })
        }
      } catch (ex){
        console.log(ex)
      }
    }
    load()
  }, [])
  
  function makeContentEditable(){
    setMode("edit")
    setChangeMdRow(post.content)
    // setEditAble(!isEditAble)
  }
  
  
  function handleDiscard(){
    setMode("")
  }
  
  function saveOnDatabase(){
    if(changeMdRow) {
      api.post("/api/update-post", {content: changeMdRow, _id: post._id}).then(response => {
        if(response.status === 201){
          setMarkdown(marked.parse(changeMdRow))
          setMode("")
        }
      }).catch(ex => {
        console.log(ex.message)
      })
    } else {
      console.log("please make some change")
    }
  }
  
  function previewChange(){
    if(mode === "preview") {
      setMode("edit")
    } else {
      setMode("preview")
      setMarkdown(marked.parse(changeMdRow))
    }
  }
  
  function handleBlur(e){
    setChangeMdRow(e.target.innerText)
  }

  return (
			<div className="">
				<h1 className="title">Post Detail </h1>
        
        <div className="action_icons">
          
          { mode === "" && <svg onClick={makeContentEditable} class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"/></svg>}
          {mode === "edit" && <svg onClick={handleDiscard} class="icon times-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>}
          {(mode === "edit" || mode === "preview") &&
					  <svg onClick={previewChange}  class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/></svg>
          }
          {(mode === "edit" || mode === "preview") && <svg onClick={saveOnDatabase} class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>}

        </div>
        
        <div id="post_details">
          
          { post && (
            <div>
              <h1>{post.title}</h1>
              <p>{post.summary}</p>
              <div onBlur={handleBlur} contentEditable={(mode === "edit")} className={["content", (mode === "edit") ? "content_edit_mode":""].join(" ")} ref={ref}>
                <pre>
                  { (mode === "edit") ?  (
                    <p>{changeMdRow}</p>
                  ) : <div dangerouslySetInnerHTML={{__html:  markdown}} /> }
                </pre>
              </div>
            </div>
          ) }
        </div>
			</div>
	)
}


export default connect(PostDetail)