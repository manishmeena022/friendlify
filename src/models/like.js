import {model, models, Schema} from "mongoose";

const LikeSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    likeable : {
        type : Schema.Types.ObjectId,
        required : true,
        refPath : "onModel"
    },
    onModel : {
        type : String,
        required : true,
        enum : ["Post","Comment"]
    }
},{
    timestamps : true
})

export const Like = models?.Like || model("Like", LikeSchema);