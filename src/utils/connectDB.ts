import mongoose from 'mongoose';

const connectDB =async () => {
    const dbUri= process.env.dbURI || '';
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