import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import bcrypt from "bcrypt"


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userid).select("+email +role").exec();
        res.status(200).json(user);
    }
    catch (error) {
        next(error)
    }
}

interface SignupBody {
    name: string;
    email?: string;
    password?: string;
    role: string;
}

export const register: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;

        if (!name || !email || !password || !role) {
            throw createHttpError(400, "Invalid credentials");
        }

        const existing_user = await UserModel.findOne({ name: name }).exec();
        if (existing_user) {
            throw createHttpError(400, "User already exists");
        }
        const existing_Email = await UserModel.findOne({ email: email }).exec();
        if (existing_Email) {
            throw createHttpError(400, "Email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({ name: name, email: email, password: hashedPassword, role: role });

        req.session.userid = newUser._id;

        res.status(201).json(newUser);


    }
    catch (error) {
        next(error)
    }
}

interface LoginBody {
    name: string;
    password: string;
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    try {
        const name = req.body.name;
        const password = req.body.password;

        if (!name || !password) {
            throw createHttpError(400, "Invalid credentials");
        }

        const user = await UserModel.findOne({ name: name }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        if (!user.password) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userid = user._id;

        res.status(201).json(user);


    }
    catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err)
        }
        res.status(200);
    })
}

export default { login, register } 