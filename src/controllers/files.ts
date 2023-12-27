import { RequestHandler } from "express";
import UserModel from "../models/user"
//import path from "path";


export const test: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Test successful", user: req.session.userid });
    }
    catch (error) {
        next(error);
    }
}

export const upload_file: RequestHandler = async (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const filePath = req.file.path; // Path where the file is stored

        const userId = req.session.userid; // Assuming you store user ID in the session

        const user = await UserModel.findByIdAndUpdate(userId, { $push: { filePaths: filePath } }, { new: true });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // You can send the file path back to the client if needed
        res.status(200).json({ filePath: filePath });

        //res.json({ message: 'File uploaded successfully', file: req.file });
    } catch (err) {
        next(err);
    }
};

export const get_all_files: RequestHandler = async (req, res, next) => {
    try {
        const userId = req.session.userid; // Assuming you store user ID in the session
        //find user by id
        const user = await UserModel.findById(userId).select("+filePaths").exec();

        if (!user || !user.filePaths || user.filePaths.length === 0) {
            return res.status(404).send("No files found for the user");
        }

        // You can send the file paths back to the client if needed
        res.status(200).json({ filePaths: user.filePaths });
    } catch (err) {
        next(err);
    }
};



export const download: RequestHandler = async (req, res, next) => {
    const filename = req.params.filename;
    try {
        const userId = req.session.userid; // Assuming you store user ID in the session
        //find user by id
        const user = await UserModel.findById(userId).select("+filePaths").exec();

        if (!user || !user.filePaths || user.filePaths.length === 0) {
            return res.status(404).send("No files found for the user");
        }

        // Check if the requested filename exists in the user's filePaths array
        const filePath = user.filePaths.find((path) => path.endsWith(filename));

        if (!filePath) {
            return res.status(404).send("File not found");
        }

        // Set the appropriate headers for the client to handle the file
        res.download(filePath, filename);
    } catch (err) {
        next(err);
    }
};


