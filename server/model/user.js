import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        required: true
    }

})

const userModel = mongoose.models.recipe || mongoose.model("recipe", userSchema)

export default userModel;