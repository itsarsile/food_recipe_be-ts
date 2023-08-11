import express, { Express, Request, Response } from "express";
import routes from './routes'
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/', routes)
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world!" });
});




app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
