import { RequestHandler } from "express";

export const requiresAuth: RequestHandler = async (req, res, next) => {
    try {
        if (req.session.userid) {
            next();
        } else {
            res.redirect("/login");
        }
    }
    catch (error) {
        next(error);
    }
}