import "dotenv/config"
import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv"

const port = env.PORT

mongoose.connect(env.MONGO_STRING_CONNECTION)
    .then(() => {
        console.log("Connected Database")
    })

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})