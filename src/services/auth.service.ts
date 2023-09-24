import mongoose, {SchemaDefinition} from 'mongoose';
import UserModel, { UserDoc } from '../model/userModel';

export async function getUserByUsername(username: string){
    return UserModel.findOne({username}).lean();
}

export async function getUserByID(id:string) {
    return UserModel.findOne({_id: new mongoose.Types.ObjectId(id)}).lean();
    
}

export async function createUser(user:SchemaDefinition<UserDoc>) {
    return UserModel.create(user);   
}