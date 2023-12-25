import { Schema, InferSchemaType, model } from "mongoose"

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String
})

type User = InferSchemaType<typeof UserSchema>

export default model<User>("User", UserSchema)