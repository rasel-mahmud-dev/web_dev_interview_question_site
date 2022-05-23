import mongoose, {Mongoose, Schema, Types} from 'mongoose';

export interface PostType{
  _id: string
  name: string
  slug: string
}

const categorySchema = new Schema({
  name: {
    type: String, // String is shorthand for {type: String}
    required: [true, 'name required'],
  },
  slug: {
    type: String,
    required: [true, 'slug required'],
  }
});



mongoose.model("Category", categorySchema)
