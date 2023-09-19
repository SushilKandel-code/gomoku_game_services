import mongoose, { DocumentDefinition } from "mongoose";
import UserModel, { UserDoc } from '../model/userModel';

export async function getUserByUsername(username: string){
    return UserModel.findOne({username}).lean();
}

export async function getUserByID(id:string) {
    return UserModel.findOne({_id: new mongoose.Types.ObjectId(id)}).lean();
    
}

export async function createUser(user:DocumentDefinition<UserDoc>) {
    return UserModel.create(user);   
}