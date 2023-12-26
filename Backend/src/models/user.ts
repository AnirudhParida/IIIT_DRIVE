import { Schema, InferSchemaType, model } from "mongoose"

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "user" },
    status: { type: String, default: "pending" }
})

type User = InferSchemaType<typeof UserSchema>

export default model<User>("User", UserSchema)