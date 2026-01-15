import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/advanceedu`)
            .then(() => {
                console.log('database is connected')
            })
    } catch (error) {
        console.log(`database connected failed`, error)
    }
}

export default connectDB