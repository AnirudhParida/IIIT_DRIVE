import { RequestHandler } from "express";
import AdminModel from "../models/admin";
import UserModel from "../models/user";
import createHttpError from "http-errors";
//import bcrypt from "bcrypt"


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const admin = await AdminModel.findById(req.session.adminid).select("+email +role +adminname").exec();
        res.status(200).json(admin);
    }
    catch (error) {
        next(error)
    }
}


interface LoginBody {
    adminname: string;
    admin_password: string;
}

export const login_Admin: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    try {
        const adminname = req.body.adminname;
        const admin_password = req.body.admin_password;


        if (!adminname) {
            throw createHttpError(400, "Invalid credentials");
        }
        if (!admin_password) {

            throw createHttpError(400, "Invalid credentials");
        }

        const admin = await AdminModel.findOne({ adminname: adminname }).select("+admin_password +role").exec();
        if (!admin) {
            throw createHttpError(400, "Invalid credentials");
        }

        if (admin.role !== "admin") {
            throw createHttpError(400, "Invalid credentials");
        }

        // const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
        // if (!isMatch) {
        //     throw createHttpError(400, "Invalid credentials");
        // }

        const isMatch = admin_password === admin.admin_password;
        if (!isMatch) {
            throw createHttpError(400, "Invalid credentials");
        }

        req.session.adminid = admin._id;

        res.status(200).json({ message: "Login successful", admin: admin });
    }
    catch (error) {
        next(error)
    }
}

//get all user with status pending
export const getPendingUser: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find({ status: "pending" }).exec();
        res.status(200).json(users);
    }
    catch (error) {
        next(error)
    }
}

export const approveUser: RequestHandler = async (req, res, next) => {
    try {
        const id = req.body._id;
        const user = await UserModel.findByIdAndUpdate(id, { status: "approved" }).exec();
        if (!user) {
            throw createHttpError(404, "User not found");
        }
        res.status(200).json({ message: "User approved" });
    }
    catch (error) {
        next(error)
    }
}

export const getAllUser: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find({ role: "user" }).exec();
        res.status(200).json(users);
    }
    catch (error) {
        next(error)
    }
}

export const getAllApprovedUser: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find({ status: "approved" }).exec();
        res.status(200).json(users);
    }
    catch (error) {
        next(error)
    }
}

export const logout_Admin: RequestHandler = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err)
        }
        res.status(200);
    })
}
