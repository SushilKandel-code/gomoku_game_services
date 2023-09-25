import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import schemaVaidate from '../middleware/schemaValidate';
import { getGameByIDSchema, createGameSchema, updateGameSchema, deleteGameSchema} from '../databaseSchema/gameSchema';
import { getGameByID, getGamesByUserID, createGame, updateGame, deleteGame} from '../services/game.service'
import { userDeserialize } from '../middleware/userDeserialize';

const gameHandler = express.Router();
gameHandler.use(userDeserialize);

//get games
gameHandler.get("/", async(req: Request, res: Response) =>{
    const userID = req.userId;
    console.log(userID);
    const games = await getGamesByUserID(userID);
    if(!games) return res.sendStatus(404);
    return res.status(200).json(games);
})

//get games by id
gameHandler.get("/:id", schemaVaidate(getGameByIDSchema), async(req: Request, res: Response)=>{
    const gameID = req.params.id;
    const userID = req.userId;
    const game = await getGameByID(gameID);
    if(!game) return res.sendStatus(404);
    return res.status(200).json({...game});
})

//creating game
gameHandler.post("/", schemaVaidate(createGameSchema), async(req: Request, res:Response)=>{
    const userID = req.userId;
    const game = req.body;
    const newGame = await createGame({...game, userID});
    return res.status(200).send(newGame);
})

//updating game
gameHandler.put("/:id", schemaVaidate(updateGameSchema), async(req:Request, res:Response)=>{
    try{

        const userID = req.userId;
    const game = req.body;
    const gameID = req.params.id;
    const newGame = await updateGame(gameID, userID, {...game, userID});
    console.log(newGame);
    if(!newGame) return res.sendStatus(400);
    return res.status(200).json(newGame);
    }catch(err){
        console.log(err);
    }
    
})

//delete game
gameHandler.delete("/:id", schemaVaidate(deleteGameSchema), async(req: Request, res: Response)=>{
    const gameID = req.params.id;
    const userID = req.userId;
    await deleteGame(gameID, userID);
    return res.sendStatus(200);
})

export default gameHandler;