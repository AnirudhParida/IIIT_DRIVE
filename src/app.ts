import express from "express"
import createHttpError, { isHttpError } from "http-errors"
import admin_router from "./routes/admin"
import user_router from "./routes/user"
//import files_router from "./routes/files"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import MongoStore from "connect-mongo";
import session from "express-session";
import env from "./util/validateEnv"


const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

//Session using MongoStore and express-session 
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_STRING_CONNECTION,
        collectionName: "sessions"
    })
}))

app.use("/api/admin", admin_router)
app.use("/api/user", user_router)
//app.use("/api/files", files_router)


app.get("/", (req, res) => {
    res.send("Hello World")
})

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IIIT Drive API with Swagger",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:8000/`,
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use((req, res, next) => {
    next(createHttpError(404, 'Not found'));
})

//error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(error)
    let errorMessage = "An error occurred, please try again later";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
    next();
})

export default app
