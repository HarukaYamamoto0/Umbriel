import express from "express";
import helmet from "helmet";
import compression from "compression";
import userRouter from "./routers/userRouter.js";

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

// Routers
app.get("/heartbeat", (req, res) => {
  res.sendStatus(200)
})

app.use("/users", userRouter);

export default app;
