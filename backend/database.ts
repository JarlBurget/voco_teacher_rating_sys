import dotenv from "dotenv";

dotenv.config();

import { Sequelize } from "@sequelize/core";
import { MariaDbDialect } from "@sequelize/mariadb";

const sequelize = new Sequelize({
	dialect: MariaDbDialect,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 3306,
	showWarnings: true,
	connectTimeout: 1000,
});

export const initDb = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		// Import models after sequelize is ready to avoid circular dependency
		const { initializeDatabase } = await import("./models");
		initializeDatabase(sequelize);

		// Sync all models with the database
		await sequelize.sync();
		console.log("All models were synchronized successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		throw error;
	}
};

export default sequelize;
