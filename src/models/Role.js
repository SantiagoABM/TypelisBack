import {Schema, model} from 'mongoose';

export const ROLES = [ "admin", "moderator", "premium"];

const roleSchema = new Schema(
    {
        name: String,
        usuarios:{
            ref:'user',
            type: Schema.Types.ObjectId
        }
    }, {
        versionKey: false
    }
);

export default model("Role", roleSchema);
