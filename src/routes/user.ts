/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: User API
 *   version: 1.0.0
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           default: user
 *           description: The role of the user, defaults to "user"
 *         status:
 *           type: string
 *           default: pending
 *           description: The status of the user, defaults to "pending"
 *         filePaths:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of file paths associated with the user
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * paths:
 *   /user/:
 *     get:
 *       summary: Get authenticated user
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 role: "user"
 *                 status: "pending"
 *                 filePaths: []
 *
 *   /user/register:
 *     get:
 *       summary: Get user registration form
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 message: "Render registration form"
 *
 *     post:
 *       summary: Register a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               example:
 *                 message: "User registered successfully"
 *                 user:
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   role: "user"
 *                   status: "pending"
 *                   filePaths: []
 *
 *   /user/login:
 *     post:
 *       summary: Log in as a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         '200':
 *           description: Successful login
 *           content:
 *             application/json:
 *               example:
 *                 message: "Login successful"
 *                 user:
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   role: "user"
 *                   status: "pending"
 *                   filePaths: []
 *
 *   /user/logout:
 *     get:
 *       summary: Log out as a user
 *       responses:
 *         '200':
 *           description: Successful logout
 */


import express from "express";
import * as UserController from "../controllers/user";
import { requiresAuth } from "../middleware/requiresAuth";
//import { isApproved } from "../middleware/isApproved";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser)

router.get("/register", UserController.get_register);

router.post("/register", UserController.post_register);

router.post("/login", UserController.login);

router.get("/logout", UserController.logout);

export default router;