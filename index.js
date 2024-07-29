import express from "express";
import { songRouter } from "./router/songRouter.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, (err) => {
    console.log(
        err 
        ? `Error launching server: ${err.message}`
        : `Server running on http://localhost:${PORT} \n
        Ctrl + C to exit.`
    )
});

app.use('/api/songs', songRouter);

