import express , { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import schemaValidate from '../middleware/schemaValidate'
import { createUser, getUserByUsername } from '../services/auth.service';
import { InputRegister, InputLogin, schemaRegister } from '../databaseSchema/authSchema';
import { signJWT } from '../utils/jwt';

const authHandler = express.Router();

//register new user

authHandler.post("/register", schemaValidate(schemaRegister), async (req: Request<{}, {}, InputRegister["body"]>, res: Response) => {
    try{
        const { username, password } = req.body;
        //check whether user already exists in database or not
        const existingUser = await getUserByUsername(username);
        if(existingUser){
            return res.status(409).send("User Already Exists. Please Login..");
        }

        //encrypting user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //creating user in database
        const newUser = await createUser({
            username,
            password: encryptedPassword
        });

        //creating token
        const token = signJWT({ username, _id: newUser._id});

        //returning new user with jwt token
        res.status(200).json({_id:newUser._id, token});
    }catch(err){
        return res.status(500).send(err);
    }
})


//Login as a user
authHandler.post("/login", async (req: Request<{},{}, InputLogin["body"]>, res: Response) =>{
    try{
        //getting user input
        const {username, password} = req.body;
        //validating use either it is already exist in database or not
        const user = await getUserByUsername(username);

        if( user && (await bcrypt.compare(password, user.password))){
            //token creating
            const token = signJWT({username, _id: user._id});
            return res.status(200).json({_id: user._id, token});
        }
        return res.status(400).send('Invalid Credentials');
    } catch(err){
        return res.status(500).send(err);
    }
})

export default authHandler;