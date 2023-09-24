import mongoose from 'mongoose';

const connectDB =async () => {
    const dbUri= "mongodb://atlas-sql-650f25d4349cbc1216a09482-xmrmf.a.query.mongodb.net/Gomoku?ssl=true&authSource=admin";
    console.log('[SERVER: Connecting to database....')
    try{
        await mongoose.connect(dbUri);
    }catch(error){
        console.log("[SERVER: Failed to connect to database");
        console.log(error);
        process.exit(1);
    }
    
}

export default connectDB;