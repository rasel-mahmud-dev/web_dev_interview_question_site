import mongoose, { Schema} from 'mongoose';

export interface CategoryType{
  _id: mongoose.Schema.Types.ObjectId
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
