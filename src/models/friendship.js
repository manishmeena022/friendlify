import {model, models, Schema} from "mongoose";

const FriendshipSchema = new Schema({
    from_user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    to_user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timestamps : true
});

export const Friendship = models?.Friendship || model("Friendship", FriendshipSchema);