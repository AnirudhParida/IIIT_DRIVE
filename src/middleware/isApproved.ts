import { RequestHandler } from "express";
import UserModel from "../models/user";

export const isApproved: RequestHandler = async (req, res, next) => {
    try {

        const id = req.session.userid;
        const waiting_User = await UserModel.findById(id).select("+email +status").exec();
        if (waiting_User === null) {
            res.status(401).json({ error: "User not found" });
        }
        if (waiting_User && (waiting_User.status as string) === "pending") {
            res.status(401).json({ error: "Your account is not approved yet" });



        }
        else {
            next();
        }
    }
    catch (error) {
        next(error);
    }

}

