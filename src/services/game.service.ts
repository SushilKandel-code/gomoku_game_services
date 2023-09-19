import mongoose, { DocumentDefinition } from 'mongoose';
import { GameDoc } from '../model/gameModel';
import GameModel from '../model/gameModel';

//  Function to return all games.
export async function getAllGames() {
    return await GameModel.find().lean();
}

//  Function to return game by Id.
export async function getGameByID(id: string){
    return await GameModel.findById(id).lean();
}

//  Function to return games by userId.
export async function getGamesByUserID(userId: string){
    return await GameModel.find({userId}).lean();
}

//  Function to create a new game.
export async function createGame(input: DocumentDefinition<GameDoc>){
    return GameModel.create(input);
}

//  Function to update a game.
export async function updateGame(id: string, userID: string, input: DocumentDefinition<GameDoc>){  // added userId.
    return GameModel.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
            userId: new mongoose.Types.ObjectId(userID)
        },
        input,
        { new: true }
    )
}

//  Function to delete a game.
export async function deleteGame(id: string, userID: string){ 
    return GameModel.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
        userID: new mongoose.Types.ObjectId(userID)
    })
}