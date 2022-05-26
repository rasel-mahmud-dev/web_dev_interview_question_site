/* GET home page. */
import {NextFunction, Request, Response} from "express";
import mongoose from "mongoose";
import slugify from "../utils/slugify";



export const getHomePage = async (req: Request, res: Response, next:NextFunction)=> {
  
  let client;
  
  try {
    
    let catWithPost = {}
    
    const uri = process.env.MONGO_DB_URI
    client = await mongoose.connect(uri)
    
  
    const Post = mongoose.model("Post")
    let posts: any = await Post.find({})
    
    const Category =  mongoose.model("Category")
    let categories: any = await Category.find({})
    categories && categories.forEach(category=>{
      posts && posts.findIndex(post=>{
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
      posts: posts
    });


  } catch (ex){
    console.log(ex)
    return res.render('index', {
      title: 'Javascript-refresh',
      posts: null
    });

  } finally {
    await client?.disconnect()
  }
}

export const getCategories = async (req: Request, res: Response, next:NextFunction)=> {
  
  let client;
  
  try {
    const Category =  mongoose.model("Category")
    let categories: any = await Category.find({})
    
    return res.status(200).json(categories);
  } catch (ex){
    return res.status(500).json( null);

  } finally {
  
  }

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
      sidebarData: catWithPost,
      categories: categories
    });

  } catch (ex){
    return res.status(500).json( {
      sidebarData: null
    });

  } finally {
  
  }

}

export const getPost = async (req: Request, res: Response, next:NextFunction)=> {
  
  const {slug, withCategories = false}  = req.body
  try {
    
    const Post =  mongoose.model("Post")
    let post = await Post.findOne({slug: slug})
    if(post) {
      return res.json(post)
    } else {
      return res.status(404).json(null)
    }
  } catch (ex){
    return res.status(500).json( null);

  } finally {
  
  }
}

export const getAddPostPage =  async (req: Request, res: Response, next:NextFunction)=>{
  
  try {
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
export const getUpdatePostPage =  async (req: Request, res: Response, next:NextFunction)=>{
  return res.render('add-post', {
    title: 'Update Post'
  });
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


export const addCategoryHandler =   async (req: Request, res: Response, next:NextFunction)=>{
  const {categoryName} = req.body
  let Category = mongoose.model("Category")
  let cat = await Category.findOne({slug:  slugify(categoryName)})
  if(cat) {
    return res.status(409).json({message: "Category already exists"})
  }
  
  let newCategory  = new Category({
    name: categoryName,
    slug: slugify(categoryName)
  })
  
  
  try{
    newCategory = await newCategory.save()
    if(newCategory) {
      res.status(201).send({
        name: newCategory.name,
        slug: newCategory.slug,
        _id: newCategory._id
      })
    } else {
      res.status(500).json({message: "category not save"})
    }
  } catch (ex){
    res.status(500).json({message: ex.message})
  }
}

export const updatePost =   async (req: Request, res: Response, next:NextFunction)=>{
  
  const {_id} = req.body

  try {
    
    let Post = mongoose.model("Post")
    let isUpdated  = await Post.updateOne(
      {_id: _id}, {
        $set: {
          ...req.body
        }
      }
    )
    if(isUpdated.modifiedCount > 0){
      res.status(201).json({})
    } else {
      res.status(201).json({})
    }
    
  } catch (ex){
    res.status(500).json({})
   
    
  } finally {
  
  }
}
