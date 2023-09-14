import mongoose, { Document } from "mongoose";
import { UserDoc } from './userModel'

export interface GameDoc extends Document{
    userID: UserDoc['id'];
    size: number,
    moves: number[][],
    date: string,
    result: string
}

const gameSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    size: Number,
    moves: [[Number]],
    date: String,
    result: String
})

export default mongoose.model<GameDoc>("Game", gameSchema);