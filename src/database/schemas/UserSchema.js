import { Schema, model } from "mongoose";
import validator from "validator"

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
    validate: (value) => {
      return validator.isEmail(value)
    }
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "Project",
    require: false,
    
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()    
})

export default model("User", userSchema);
