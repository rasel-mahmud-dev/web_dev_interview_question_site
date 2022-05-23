import mongoose, {Mongoose, Schema, Types} from 'mongoose';


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

const postSchema = new Schema({
  title: {
    type: String, // String is shorthand for {type: String}
    required: [true, 'title required'],
  },
  summary: {
    type: String,
    required: [true, 'summary required'],
  },
  author_id: { type: mongoose.Types.ObjectId, ref: "User" },
  slug: { type: String, index: true },
  body: {
    type: String,
    required: [true, 'Body required'],
  },
  created_at: { type: Date, default: Date.now },
  isPublic: Boolean
});



mongoose.model("Post", postSchema)