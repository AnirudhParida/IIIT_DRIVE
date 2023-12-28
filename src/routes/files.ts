/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: File API
 *   version: 1.0.0
 * components:
 *   schemas:
 *     Files:
 *       type: object
 *       properties:
 *         filename:
 *           type: string
 *           description: The name of the file
 *         originalname:
 *           type: string
 *           description: The original name of the file
 *         mimetype:
 *           type: string
 *           description: The MIME type of the file
 *         size:
 *           type: number
 *           description: The size of the file in bytes
 *         uploadDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the file was uploaded
 *         path:
 *           type: string
 *           description: The file path
 *       required:
 *         - filename
 *         - originalname
 *         - mimetype
 *         - size
 *         - path
 */

/**
 * @swagger
 * paths:
 *   /upload:
 *     post:
 *       summary: Upload a file
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   format: binary
 *       responses:
 *         '200':
 *           description: File uploaded successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "File uploaded successfully"
 *                 file:
 *                   filename: "example.txt"
 *                   originalname: "example.txt"
 *                   mimetype: "text/plain"
 *                   size: 1024
 *                   uploadDate: "2023-01-01T12:00:00Z"
 *                   path: "/uploads/example.txt"
 *
 *   /get-file:
 *     get:
 *       summary: Get information about all files
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 - filename: "example.txt"
 *                   originalname: "example.txt"
 *                   mimetype: "text/plain"
 *                   size: 1024
 *                   uploadDate: "2023-01-01T12:00:00Z"
 *                   path: "/uploads/example.txt"
 *                 - filename: "example2.txt"
 *                   originalname: "example2.txt"
 *                   mimetype: "text/plain"
 *                   size: 2048
 *                   uploadDate: "2023-01-02T12:00:00Z"
 *                   path: "/uploads/example2.txt"
 *
 *   /download/{filename}:
 *     get:
 *       summary: Download a file
 *       parameters:
 *         - in: path
 *           name: filename
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         '200':
 *           description: File download successful
 *           content:
 *             application/json:
 *               example:
 *                 message: "File download successful"
 *                 file:
 *                   filename: "example.txt"
 *                   originalname: "example.txt"
 *                   mimetype: "text/plain"
 *                   size: 1024
 *                   uploadDate: "2023-01-01T12:00:00Z"
 *                   path: "/uploads/example.txt"
 */


import express from "express";
import * as FileController from "../controllers/files";
import upload from "../middleware/upload_multer";


const router = express.Router();

router.get("/test", FileController.test);

router.post("/upload", upload, FileController.upload_file);

router.get("/get-file", FileController.get_all_files);

router.get("/download/:filename", FileController.download);

export default router;