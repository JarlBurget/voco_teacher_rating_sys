import express from "express";
import dotenv from "dotenv";
import { initDb } from "./database";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("dist"));

app.get("/", (req, res) => {
	res.send("Welcome to the Teacher Rating API");
});

const PORT = process.env.PORT || 3000;

// Initialize database and start server
initDb()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Failed to initialize database:", error);
		process.exit(1);
	});

export default app;
