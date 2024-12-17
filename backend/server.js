import express from "express";
import cors from "cors"
import * as dotenv from "dotenv";

import { userRoutes } from "./routes/user.js";
import { profileRoutes } from "./routes/profile.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;
app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);


app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
    console.log(`Server running on ports ${port}`);
});
