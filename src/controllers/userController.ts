

/* GET home page. */
import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";

interface RequestWithSession extends Request{
  session: {
    user_id: string,
    role: string
  } | null
}


export const userRegistration = async (req: Request, res: Response, next:NextFunction)=> {

  const { username, email, password } = req.body
  
  let User = mongoose.model("User")
  let newUser  = new User({
    username: username,
    email: email,
    password: password,
  })
  
  try{
    await newUser.validate();
    let result: any = await newUser.save()
    
    let {password, ...other}= result
    res.json(other)
    
    
  } catch (error){

    let errors = {}
  
    if (error.name === "ValidationError") {
      let errors = {};
  
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
  
      return res.status(409).json({message: "", errors: errors})
    }
    res.status(500).send("Something went wrong");
  }
  
  
  // newPost = await newPost.save()
  // console.log(newPost)
  
  
  
  //   client = await connectDB()
  //
  //   let re =  await client.execute("SELECT * from question.categories")
  //   const categories = re.rows
  //
  //   re =  await client.execute("SELECT slug, category_slug, title from question.questions")
  //   // console.log(re.rows)
  //   let catWithPost = {}
  //   re.rows.forEach(post=>{
  //     categories.findIndex(cat=>{
  //       if(cat.slug === post.category_slug){
  //         if(catWithPost[cat.slug]){
  //           catWithPost[cat.slug] = [
  //             ...catWithPost[cat.slug],
  //             post
  //           ]
  //         } else {
  //           catWithPost[cat.slug] = [post]
  //         }
  //       }
  //     })
  //
  //   })
  //
  //
  //   // catWithPost {
  //   //   nodejs: [ Row { slug: 'asd', category_slug: 'nodejs', title: 'asd' } ]
  //   // }
  //
  //   return res.render('index', {
  //     title: 'Javascript-refresh',
  //     posts: null,
  //     html: false,
  //     categories: categories,
  //     sidebarData: catWithPost
  //   });
  //
  //
  // } catch (ex){
  //   return res.render('index', {
  //     title: 'Javascript-refresh',
  //     posts: null,
  //     html: false,
  //     categories: null,
  //     sidebarData: null
  //   });
  //
  // } finally {
  //   client?.shutdown()
  // }
  
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



export const userLogin = async (req: RequestWithSession, res: Response, next:NextFunction)=> {

  const { username, email, password } = req.body
  

  
  try{
    let User = mongoose.model("User")
    let user: any = await User.findOne({email: email})
    if(!user){
      return  res.status(404).json({message: "User not registered"})
    }
    
    if(user.password !== password){
      return  res.status(404).json({message: "User password not match"})
    }
    
    req.session.user_id = user._id.toString();
    req.session.role = user.role;
 
    return res.status(201).json({
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      role: user.role
    })
    
    
    
  } catch (error){
    return  res.status(500).json({message: error.message})
    
    let errors = {}
  
    if (error.name === "ValidationError") {
      let errors = {};
  
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
  
      return res.status(409).json({message: "", errors: errors})
    }
    res.status(500).send("Something went wrong");
  } finally {
  
  }
  
  
}

export const fetchLogin = async (req: RequestWithSession, res: Response, next:NextFunction)=> {
  

  
  try{
  
    if(req.session && req.session.user_id){
      

  
      let User = mongoose.model("User")
      
      let user: any = await User.findOne({_id: req.session.user_id})
      
      if (!user) {
        return res.status(404).json({message: "User not registered"})
      }
  
    
      return res.status(201).json({
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role
      })
    } else {
      return res.status(404).json({message: "please login first"})
    }
    
    
  } catch (error){
    return  res.status(500).json({message: error.message})
    
  } finally {
  
  }
  
  
}


export const logout = async (req: RequestWithSession, res: Response, next:NextFunction)=>{
  
  if(req.session) {
    req.session = null
    res.status(201).json({message: "You are logout"});
  }
}