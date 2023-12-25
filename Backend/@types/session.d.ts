import mongoose from "mongoose";

declare module "express-session" {
    interface SessionData {
        userid: mongoose.Types.ObjectId
    }
}