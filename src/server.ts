import cors from "cors";
import express from "express";
import "./config";
import { init } from "./routes";
import { isTest } from "./utils";

const PORT = isTest() ? 8001 : 8000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initServer = async () => {
    await init(app)
    return app.listen(PORT)
}

export default initServer