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
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 * paths:
 *   /:
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
 *                 message: "Authenticated user details"
 *                 user:
 *                   name: John Doe
 *                   email: john@example.com
 *                   role: user
 *
 *   /register:
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
 *           description: Successful registration
 *           content:
 *             application/json:
 *               example:
 *                 message: "User registered successfully"
 *                 user:
 *                   name: John Doe
 *                   email: john@example.com
 *                   role: user
 *
 *   /login:
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
 *                   name: John Doe
 *                   email: john@example.com
 *                   role: user
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *
 *   /logout:
 *     get:
 *       summary: Log out the authenticated user
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Successful logout
 *           content:
 *             application/json:
 *               example:
 *                 message: "Logout successful"
 */

import express from "express";
import * as UserController from "../controllers/user";
import { requiresAuth } from "../middleware/requiresAuth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser)

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/logout", UserController.logout);

export default router;