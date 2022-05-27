import mongoose, {Mongoose, Schema, Types} from 'mongoose';


const postSchema = new Schema({
  title: {
    type: String, // String is shorthand for {type: String}
    required: [true, 'title required'],
  },
  summary: {
    type: String,
    required: [true, 'summary required'],
  },
  author_id: { type: Schema.Types.ObjectId, ref: "User" },
  slug: { type: String, index: true },
  category_slug: { type: String, index: true,  required: [true, 'category_slug required'], },
  content: {
    type: String,
    required: [true, 'Content required'],
  },
  created_at: { type: Date, default: Date.now },
  is_public: Boolean
});



mongoose.model("Post", postSchema)