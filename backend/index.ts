import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDb } from "./database";
import router from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// NB!: Enable CORS for all routes
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("../frontend/dist"));

app.get("/", (req, res) => {
	res.sendFile("index.html", { root: "../frontend/dist" });
});

app.use("/api", router);

// Initialize database and start server
initDb()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to initialize database:", error);
		process.exit(1);
	});

export default app;
