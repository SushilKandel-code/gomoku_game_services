import mongoose, { Document} from "mongoose";

export interface UserDoc extends Document{
    username: string;
    password: string;
    createAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: { type: String, require: true},

    //timestamps tell Moongose to assign createAt and updatedAt fields to the database schema whose type is Date
}, { timestamps: true})

export default mongoose.model<UserDoc>('User', userSchema)