import express from "express";
import cors from "cors";
import routes from "./routes/routes";

const app = express();

const raw = process.env.CORS_ORIGINS || "http://localhost:5173";
const whitelist = raw.split(",").map(s => s.trim()).filter(Boolean);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","Accept","X-Requested-With"]
};

app.use(cors(corsOptions));

routes(app);

export default app;
