import express from "express";
import bodyParser from "body-parser";
import userRoutes from "../routes/userRoutes";

import { ApiError, errorHandler } from "../entities/ApiError";
import cors from "cors";

const allowedOrigins = ["http://localhost:3001"];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new ApiError(404, "Not Found");
  next(error);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
