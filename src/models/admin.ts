import { Schema, model, InferSchemaType } from 'mongoose';

const AdminSchema = new Schema({
    adminname: { type: String, required: true },
    admin_password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "admin" }
});

type Admin = InferSchemaType<typeof AdminSchema>

export default model<Admin>("Admin", AdminSchema)
