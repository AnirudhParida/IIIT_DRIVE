import { InferSchemaType, model, Schema } from "mongoose";

const FilesSchema = new Schema({
    filename: { type: String, required: true },
    originalname: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    path: {
        type: String,
        required: true
    },
});

type Files = InferSchemaType<typeof FilesSchema>;

export default model<Files>("File", FilesSchema);