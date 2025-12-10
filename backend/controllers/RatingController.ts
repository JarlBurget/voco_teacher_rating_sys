import { Request, Response } from "express";
import RatingService, { RatingServiceError } from "../services/RatingService";

export const createRating = async (req: Request, res: Response) => {
	try {
		console.log("=== createRating called ===");
		console.log("Received rating data:", req.body);
		const rating = await RatingService.createRating(req.body);
		console.log("Rating created successfully:", rating);
		res.status(201).json(rating);
	} catch (error: any) {
		console.error("=== Create rating error ===");
		console.error("Error type:", error.constructor.name);
		console.error("Error message:", error.message);
		console.error("Full error:", error);
		if (error instanceof RatingServiceError) {
			if (error.code === "VALIDATION_ERROR")
				return res.status(400).json({ error: error.message });
			if (error.code === "TEACHER_NOT_FOUND" || error.code === "USER_NOT_FOUND")
				return res.status(404).json({ error: error.message });
			if (error.code === "DUPLICATE_RATING")
				return res.status(409).json({ error: error.message });
		}
		res.status(500).json({ error: "Serveri viga", details: error.message });
	}
};

export const getRatingsByTeacher = async (req: Request, res: Response) => {
	try {
		const ratings = await RatingService.getRatingsByTeacherId(
			Number(req.params.teacherId)
		);
		res.json(ratings);
	} catch (error: any) {
		console.error("Failed to fetch ratings:", error);
		if (
			error instanceof RatingServiceError &&
			error.code === "TEACHER_NOT_FOUND"
		) {
			return res.status(404).json({ error: error.message });
		}
		res.status(500).json({ error: "Serveri viga" });
	}
};
