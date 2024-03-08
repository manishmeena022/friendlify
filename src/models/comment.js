import {model, models, Schema} from "mongoose";

const CommentSchema = new Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    post : {
        type : Schema.Types.ObjectId,
        ref : "Post"
    },
    likes : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},{
    timestamps : true
})

export const Comment = models?.Comment || model("Comment", CommentSchema);