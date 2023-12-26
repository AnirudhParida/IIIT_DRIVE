/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Admin API
 *   version: 1.0.0
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         adminname:
 *           type: string
 *           description: The admin's username
 *         admin_password:
 *           type: string
 *           description: The admin's password
 *         email:
 *           type: string
 *           format: email
 *           description: The admin's email address
 *         role:
 *           type: string
 *           default: admin
 *           description: The admin's role, defaults to "admin"
 *       required:
 *         - adminname
 *         - admin_password
 *         - email
 */

/**
 * @swagger
 * paths:
 *   /admin/login:
 *     post:
 *       summary: Log in as an admin
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       responses:
 *         '200':
 *           description: Successful login
 *           content:
 *             application/json:
 *               example:
 *                 message: "Login successful"
 *                 admin:
 *                   adminname: admin1
 *                   role: admin
 *
 *   /admin/pending-user:
 *     get:
 *       summary: Get all users with status pending
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 - name: John Doe
 *                   email: john@example.com
 *                   status: pending
 *                 - name: Jane Doe
 *                   email: jane@example.com
 *                   status: pending
 *
 *   /admin/approve-user:
 *     get:
 *       summary: Approve a user
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *       responses:
 *         '200':
 *           description: User approved
 *           content:
 *             application/json:
 *               example:
 *                 message: "User approved"
 *
 *   /admin/all-user:
 *     get:
 *       summary: Get all users with role "user"
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 - name: John Doe
 *                   email: john@example.com
 *                   role: user
 *                 - name: Jane Doe
 *                   email: jane@example.com
 *                   role: user
 *
 *   /admin/all-approved-user:
 *     get:
 *       summary: Get all users with status approved
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 - name: John Doe
 *                   email: john@example.com
 *                   status: approved
 *                 - name: Jane Doe
 *                   email: jane@example.com
 *                   status: approved
 *
 *   /admin/logout:
 *     get:
 *       summary: Log out as an admin
 *       responses:
 *         '200':
 *           description: Successful logout
 */

import express from "express";
import * as AdminController from "../controllers/admin";


const router = express.Router();

router.post("/login", AdminController.login_Admin);

router.get("/pending-user", AdminController.getPendingUser);

router.post("/approve-user", AdminController.approveUser);

router.get("/all-user", AdminController.getAllUser);

router.get("/all-approved-user", AdminController.getAllApprovedUser);

router.get("/logout", AdminController.logout_Admin);

export default router;