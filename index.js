import express from "express";
import { SongRouter } from "./router/songRouter.js";

const app = express();
const PORT = process.env.PORT ?? 4142;

app.listen(PORT, (err) => {
    console.log(
        err 
        ? `Error launching server: ${err.message}`
        : `Server running on http://localhost:${PORT} \n
        Ctrl + C to exit.`
    )
});

app.use('/api/songs', SongRouter);

