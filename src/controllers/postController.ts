/* GET home page. */
import {NextFunction, Request, Response} from "express";
import mongoose, {Schema, Types} from "mongoose";
import slugify from "../utils/slugify";





export const getHomePage = async (req: Request, res: Response, next:NextFunction)=> {
  
  let client
  // let rows =  await client.execute("SELECT * from system.local")
  // console.log(rows)
  
  
  
  try {
  
    let catWithPost = {}
    
    const Post =  mongoose.model("Post")
    let posts: any = await Post.find({})
  
    const Category =  mongoose.model("Category")
    let categories: any = await Category.find({})
  
    categories.forEach(category=>{
      posts.findIndex(post=>{
        if(category.slug === post.category_slug){
          if(catWithPost[category.slug]){
            catWithPost[category.slug] = [
              ...catWithPost[category.slug],
              post
            ]
          } else {
            catWithPost[category.slug] = [post]
          }
        }
      })
    })
    
    return res.render('index', {
      title: 'Javascript-refresh',
      posts: posts,
      html: false,
      categories: [],
      sidebarData: {}
    });


  } catch (ex){
    return res.render('index', {
      title: 'Javascript-refresh',
      posts: null,
      html: false,
      categories: null,
      sidebarData: null
    });

  } finally {
    client?.shutdown()
  }
  
  // let n = os.networkInterfaces()
  //
  // try {
  //   // let c = await connectDBB()
  //
  //   let p = path.resolve("../dist")
  //   readdir("dist").then(r=>{
  //     res.json({
  //       r,
  //       z:getTimeZone(),
  //       ip: ip.address(),
  //       connect: true
  //     })
  //   }).catch(ex=>{
  //     console.log(ex)
  //   })
  //
  //
  //   // res.json({
  //   //   z:getTimeZone(),
  //   //   ip: ip.address(),
  //   //   connect: true
  //   // })
  //   // console.log(c)
  // } catch (ex){
  //   console.log(ex)
  //   res.json({z:getTimeZone(),
  //     ip: ip.address(),
  //     ex: ex
  //   })
  //
  //
  // }
  
}

export const getSidebarData = async (req: Request, res: Response, next:NextFunction)=> {
  
  try {
    let catWithPost = {}
    
    const Post =  mongoose.model("Post")
    let posts: any = await Post.find({}).select("-content")
  
    const Category =  mongoose.model("Category")
    let categories: any = await Category.find({})
  
    categories.forEach(category=>{
      posts.findIndex(post=>{
        if(category.slug === post.category_slug){
          if(catWithPost[category.slug]){
            catWithPost[category.slug] = [
              ...catWithPost[category.slug],
              post
            ]
          } else {
            catWithPost[category.slug] = [post]
          }
        }
      })
    })
    
    return res.status(200).json( {
      sidebarData: catWithPost
    });

  } catch (ex){
    return res.status(500).json( {
      sidebarData: null
    });

  } finally {
  
  }

}

export const getAddPostPage =  async (req: Request, res: Response, next:NextFunction)=>{
  
  let client;
  try {
    // client = await connectDB()
    // let re = await client.execute("SELECT * from question.categories")
    // let categories = re.rows
  
    const Category = mongoose.model("Category")
    let categories = await Category.find({})

    return res.render('add-post', {
      title: 'Add Post',
      post: null,
      isUpdated: false,
      html: false,
      categoryName: "Javascript Fundamental",
      categories: categories
    });
  } catch (ex){
  
  } finally {
  
  }
}

export const addPostHandler =   async (req: Request, res: Response, next:NextFunction)=>{
  
  const {title, summary, content, category_slug, slug} = req.body
  
  
  let Post = mongoose.model("Post")
  let newPost  = new Post({
    title,
    summary,
    content,
    category_slug,
    slug: slugify(title),
    author_id: "6289f36aaf43d33293035508"
  })
  
  try{
    let a: any = await newPost.validate();
    a = await newPost.save()
    if(a){
      res.status(201).json(a)
    }
    
  } catch (ex){
    res.status(500).json({})
    console.log(ex.errors)
  }
}