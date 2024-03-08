import {model, models, Schema} from "mongoose";

const PostSchema = new Schema({
    content : {
        type : String,
        required : true,
    },
    image : {
        type : String,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    likes : [
        {
            type : Schema.Types.ObjectId,
            ref : "Like",
        }
    ],
    comment : {
        type : Schema.Types.ObjectId,
        ref : "Comment"
    }
},{
    timestamps : true
});

export const Post = models?.Post || model("Post", PostSchema);