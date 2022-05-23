import mongoose, {Mongoose, Schema, Types} from 'mongoose';



const userSchema = new Schema({
  username:  {
    type: String,
    required: [true, 'username required']
  },
  email: {
    type: String,
    // validate: {
    //   validator: async function(v) {
    //   }
    // },
    required: [true, 'User Email required']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    message: '{VALUE} is not supported'
  },
  password: { type: String, index: true },
  created_at: { type: Date, default: Date.now },
  avatar: String
});



const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

userSchema.path('email').validate(async function(value) {

  if(filter.test(value)){
    let User = mongoose.model("User")
    let u = await User.findOne({email: value})
    
    if(u){
      throw new Error("This user already exist")
    } else {
      return true
    }
  
  } else {
    throw new Error("Bad email format")
  }
});


mongoose.model("User", userSchema)