import mongoose, { mongo } from 'mongoose';

const connectDB =async () => {
    const dbUri= "mongodb+srv://sushil:sushil@cluster0.j5geuwi.mongodb.net/Gomoku?retryWrites=true&w=majority";
    mongoose.set('strictQuery', false);
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



