import express from "express";
import "dotenv/config";
import "./config/db.js"
import { SongRouter } from "./router/songRouter.js";
import { UserRouter } from "./router/UserRouter.js";

const app = express();
const PORT = process.env.PORT ?? 4142;

//Adding middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(PORT, (err) => {
    console.log(
        err 
        ? `Error launching server: ${err.message}`
        : `Server running on http://localhost:${PORT} \n
        Ctrl + C to exit.`
    )
});

app.use('/api/songs', SongRouter);

app.use('/api/auth', UserRouter);

