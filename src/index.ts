import express, { Express, Request, Response } from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", routes);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "I'm healthy! Keep on going!" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
