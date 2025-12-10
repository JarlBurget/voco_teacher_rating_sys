import { Rating } from "../models/RatingsModel";
import { Teacher } from "../models/TeacherModel";
import { User } from "../models/UserModel";

export interface CreateRatingDTO {
	rating: number;
	description: string;
	teacherId: number;
	userId?: number;
}

export interface UpdateRatingDTO {
	rating?: number;
	description?: string;
}

class RatingRepository {
	async findAll(): Promise<Rating[]> {
		return Rating.findAll({
			include: [{ association: "Teacher" }, { association: "User" }],
		});
	}

	async findById(id: number): Promise<Rating | null> {
		return Rating.findByPk(id, {
			include: [{ association: "Teacher" }, { association: "User" }],
		});
	}

	async findByTeacherId(teacherId: number): Promise<Rating[]> {
		try {
			return await Rating.findAll({
				where: { teacherId },
				include: [{ association: "User" }],
			});
		} catch (error) {
			console.error("RatingRepository.findByTeacherId error:", error);
			throw error;
		}
	}

	async findByUserId(userId: number): Promise<Rating[]> {
		return Rating.findAll({
			where: { userId },
			include: [Teacher],
		});
	}

	async findByTeacherAndUser(
		teacherId: number,
		userId: number
	): Promise<Rating | null> {
		return Rating.findOne({
			where: { teacherId, userId },
		});
	}

	async create(data: CreateRatingDTO): Promise<Rating> {
		try {
			console.log("RatingRepository.create called with:", data);
			const result = await Rating.create(data);
			console.log("Rating created successfully:", result);
			return result;
		} catch (error) {
			console.error("Error creating rating:", error);
			throw error;
		}
	}

	async update(id: number, data: UpdateRatingDTO): Promise<Rating | null> {
		const rating = await this.findById(id);
		if (!rating) return null;

		await rating.update(data);
		return rating;
	}

	async delete(id: number): Promise<boolean> {
		const rating = await this.findById(id);
		if (!rating) return false;

		await rating.destroy();
		return true;
	}

	async getAverageRatingForTeacher(teacherId: number): Promise<number> {
		const ratings = await Rating.findAll({
			where: { teacherId },
		});

		if (ratings.length === 0) return 0;

		const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
		return Number((sum / ratings.length).toFixed(2));
	}
}

export default new RatingRepository();
