import * as os from "os";

const { marked } = require("marked")

import {NextFunction, Request, Response, Application} from "express";
import connectDB from "../database";
import slugify from "../utils/slugify";
import path from "path";
import {readdir} from "fs/promises";
import * as postController from "../controllers/postController";

const { Client } = require("cassandra-driver");


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

// marked.parse(mdContent.toString(), (err, html) => {
  // if(!err) {
  //   res.write(html)
  //   res.end()
  //   // response(res, 200, {mdContent: html, message: "yyyyyyy"})
  // } else{
  //   response(res, 500,  "markdown file parse fail")
  // }
// });

function errorHtml(title: string){
  return `
 <div class="post_loadfail">
    <h2>${title}</h2>
    <h2>Post content not created yet.</h2>
    <img src="/images/not_found.png">
    </div>
    `
}

async function connectDBB() {
  

  const client = new Client({
    cloud: {
      secureConnectBundle: "secure-connect-question-db.zip",
    },
    credentials: {
      username: "NxAJeGdGANvZAUowAAKIlwvN",
      // process.env.CLIENT_ID
      password: "0SORqnd,Myxm3axEH4o.w9_SNjyBeUNRyyMwwYLL5Ir6aI1XJo+QoEH8sATLztdHHtA_Mep5ahWZkWduw7o4HM8XXCuBDDy34v2Y3x5.5GPr0w9On2nNd5Y+fDYeSSq4"
      // process.env.CLIENT_SECRET,
    },
  });
  
  return new Promise<any>(async function (resolve, reject){
    
    try {
      await client.connect();
      
      // Execute a query
      // const rs = await client.execute("SELECT * FROM system.local");
      // console.log(`Your cluster returned ${rs.rowLength} row(s)`);
      
      resolve(client)
      
    } catch (ex){
      reject(ex)
    } finally {
      // await client.shutdown();
    }
    
  })
}


const ip = require("ip")

export default (app: Application)=> {
  
  
  app.get("/inject.js.map", (req, res)=>{
    res.json([])
  })
  
  function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  }
  
  
  app.get('/', postController.getHomePage)

  
  
  /* GET Add Post Page */
  app.get('/add-post', postController.getAddPostPage)
  
  /* GET post page. */
  app.get('/:post_slug', async function (req: Request, res: Response, next:NextFunction) {
    
    let client
    // let rows =  await client.execute("SELECT * from system.local")
    // console.log(rows)
    
    try {
      // let a = await client.execute("INSERT INTO question.users (name, email) values(?, ?)", ['rasel', 'rasel@gmail.com'])
      // console.log(a)
      // // let rows = await client.execute(`CREATE TABLE question.users (name text PRIMARY KEY, email text);`)
      // // console.log(rows)
      //
      
      client = await connectDB()
      
      // let re =  await client.execute("SELECT * from question.categories")
      // const categories = re.rows
      //
      // re =  await client.execute("SELECT slug, category_slug, title from question.questions")
      // // console.log(re.rows)
      // let catWithPost = {}
      // re.rows.forEach(post=>{
      //   categories.findIndex(cat=>{
      //     if(cat.slug === post.category_slug){
      //       if(catWithPost[cat.slug]){
      //         catWithPost[cat.slug] = [
      //           ...catWithPost[cat.slug],
      //           post
      //         ]
      //       } else {
      //         catWithPost[cat.slug] = [post]
      //       }
      //     }
      //   })
      //
      // })
      
      
      // catWithPost {
      //   nodejs: [ Row { slug: 'asd', category_slug: 'nodejs', title: 'asd' } ]
      // }
  
      let re =  await client.execute(
        "SELECT slug, category_slug, content, title from question.questions where slug = ?",
        [req.params.post_slug]
      )
  
      let post = re.rows[0]
      if(post) {
  
        let html = marked.parse(post.content)
  
        return res.render('posts/details', {
          title: 'javascript-refresh',
          post: post,
          html,
          posts: null,
          categories: [],
          sidebarData: false
        });
      } else {
        
        return res.render('posts/details', {
          title: 'javascript-refresh',
          post: post,
          html: "",
          posts: null,
          categories: [],
          sidebarData: false
        });
      }
      
    } catch (ex){
      console.log(ex)
      
    } finally {
      client?.shutdown()
    }
  })
  
  
  
  
  
  /* GET update post page  */
  app.get('/update-post/:slug', async function (req: Request, res: Response, next:NextFunction) {
    
    let client;
    try {
    client = await connectDB()
      let re = await client.execute("SELECT * from question.categories")
      let categories = re.rows
  
  
      re =  await client.execute(
        "SELECT * from question.questions where slug = ?",
        [req.params.slug]
      )
  
      let post = re.rows[0]
      
      return res.render('add-post', {
        title: 'Update Post',
        isUpdated: true,
        post: post,
        categoryName: "Javascript Fundamental",
        categories
      });
    } catch (ex){
    
    } finally {
      client?.shutdown()
    }
  })
  
  
  
  // Action new post or update post
  app.post('/api/add-post', async function (req: Request, res: Response, next:NextFunction) {
    
    const {title, summary, content, category_slug, slug} = req.body
    
    let client;
    
    try {
      client = await connectDB()
      if(slug){
        // update post
        let result = await client.execute(`
          UPDATE question.questions
            SET title = ?, summary = ?, content = ?, category_slug = ?
           where slug = ?
        `, [title, summary, content, category_slug, slug])
        
        res.status(201).json({message: "Post Updated"})
        
      } else {
        // let rows = await client.execute(`CREATE TABLE IF NOT EXISTS question.questions(slug text, category_slug text, title text, summary text, content text, created_at timestamp, PRIMARY KEY (slug));`)
        // console.log(rows)
        
        let a = await client.execute("INSERT INTO question.questions (slug, category_slug, title, summary, content, created_at) values(?, ?, ?, ?, ?, ?)", [slugify(title), category_slug, title, summary, content, new Date()])
        res.status(201).json({message: "Post added"})
      }
    } catch (ex){
      res.status(500).json({message: ex.message})
    } finally {
      client?.shutdown()
    }
    
  })
  


  
  // Action new post or update post
  app.post('/api/delete-post', async function (req: Request, res: Response, next:NextFunction) {
    const {slug} = req.body
    let client;
    
    try {
      client = await connectDB()
      // await client.execute(`DROP TABLE question.questions`)
      
      if(slug){
        let result = await client.execute(`DELETE from question.questions where slug = ?`, [slug])
        console.log(result)
      } else {
        let result = await client.execute(`DELETE from question.questions where slug = ?`, ["false"])
        console.log(result)
      }

    } catch (ex){
      console.log(ex)
    } finally {
      client?.shutdown()
    }
  })


  
}
