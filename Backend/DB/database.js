import mongoose from 'mongoose';

export const DBConnect = async () => {
    try {
        
        await mongoose.connect(process.env.MONGOURI)
        console.log("Database Connected");
    } catch (error) {
        console.error(error)
    }
}
