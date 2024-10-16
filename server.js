import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.get("/", function (req, res) {
  res.json({
    message: "Bonjur, World",
  });
});

export default app;
