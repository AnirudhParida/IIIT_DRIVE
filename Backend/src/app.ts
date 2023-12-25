import express from "express"
import createHttpError, { isHttpError } from "http-errors"
import user_router from "./routes/user"


const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/api/user", user_router)


app.get("/", (req, res) => {
    res.send("Hello World")
})

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
