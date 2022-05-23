/* GET home page. */
import {NextFunction, Request, Response} from "express";
import mongoose, {Schema} from "mongoose";




export const getHomePage = async (req: Request, res: Response, next:NextFunction)=> {
  
  let client
  // let rows =  await client.execute("SELECT * from system.local")
  // console.log(rows)
  
  
  
  try {
    // let a = await client.execute("INSERT INTO question.users (name, email) values(?, ?)", ['rasel', 'rasel@gmail.com'])
    // console.log(a)
    // let rows = await client.execute(`CREATE TABLE question.users (name text PRIMARY KEY, email text);`)
    // console.log(rows)

  
  
  // newPost = await newPost.save()
  // console.log(newPost)
  
  
    
    // client = await connectDB()

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

    return res.render('index', {
      title: 'Javascript-refresh',
      posts: null,
      html: false,
      categories: null,
      sidebarData: null
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

export const getAddPostPage =  async (req: Request, res: Response, next:NextFunction)=>{
  
  let client;
  try {
    // client = await connectDB()
    // let re = await client.execute("SELECT * from question.categories")
    // let categories = re.rows

    return res.render('add-post', {
      title: 'Add Post',
      post: null,
      isUpdated: false,
      html: false,
      categoryName: "Javascript Fundamental",
      categories: null
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
    slug,
    author_id: new mongoose.Schema.Types.ObjectId("6289f36aaf43d33293035508")
  })
  
  try{
    let a = await newPost.validate();
    console.log(a)
    
  } catch (ex){
    console.log(ex.errors)
  }
}