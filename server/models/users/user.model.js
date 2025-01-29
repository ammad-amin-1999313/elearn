import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true , 'Name is required'], trim: true },
    email: { type: String, required: [true, 'email is required'], unique: true, trim: true , lowercase : true , match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],},
    password: { type: String, required: [true, 'Password is required'] , minlength : [6 , 'Password must be atleast 6 characters long'] },
    createdAt: { type: Date, default: Date.now, immutable: true },
    updatedAt: { type: Date, default: Date.now },
  },

  { timestamps: true, }
)

const User = mongoose.model("User", UserSchema);
export default User;
