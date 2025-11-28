import TeacherRepository, {
	CreateTeacherDTO,
	UpdateTeacherDTO,
} from "../repositories/TeacherRepository";
import { Teacher } from "../models/TeacherModel";

export class TeacherServiceError extends Error {
	constructor(message: string, public code: string) {
		super(message);
		this.name = "TeacherServiceError";
	}
}

class TeacherService {
	async getAllTeachers(): Promise<Teacher[]> {
		return TeacherRepository.findAll();
	}

	async getTeacherById(id: number): Promise<Teacher> {
		const teacher = await TeacherRepository.findById(id);
		if (!teacher) {
			throw new TeacherServiceError("Õpetajat ei leitud", "TEACHER_NOT_FOUND");
		}
		return teacher;
	}

	async createTeacher(data: CreateTeacherDTO): Promise<Teacher> {
		// Valideerimine
		if (!data.name || data.name.trim().length === 0) {
			throw new TeacherServiceError(
				"Õpetaja nimi on kohustuslik",
				"VALIDATION_ERROR"
			);
		}

		if (data.name.length > 100) {
			throw new TeacherServiceError(
				"Õpetaja nimi ei tohi olla pikem kui 100 tähemärki",
				"VALIDATION_ERROR"
			);
		}

		if (!data.description || data.description.trim().length === 0) {
			throw new TeacherServiceError(
				"Õpetaja kirjeldus on kohustuslik",
				"VALIDATION_ERROR"
			);
		}

		if (data.description.length > 255) {
			throw new TeacherServiceError(
				"Kirjeldus ei tohi olla pikem kui 255 tähemärki",
				"VALIDATION_ERROR"
			);
		}

		// Kontrolli, kas sama nimega õpetaja juba eksisteerib
		const existingTeacher = await TeacherRepository.findByName(data.name);
		if (existingTeacher) {
			throw new TeacherServiceError(
				"Sama nimega õpetaja juba eksisteerib",
				"DUPLICATE_TEACHER"
			);
		}

		return TeacherRepository.create({
			name: data.name.trim(),
			description: data.description.trim(),
		});
	}

	async updateTeacher(id: number, data: UpdateTeacherDTO): Promise<Teacher> {
		// Kontrolli, kas õpetaja eksisteerib
		await this.getTeacherById(id);

		// Valideerimine
		if (data.name !== undefined) {
			if (data.name.trim().length === 0) {
				throw new TeacherServiceError(
					"Õpetaja nimi on kohustuslik",
					"VALIDATION_ERROR"
				);
			}
			if (data.name.length > 100) {
				throw new TeacherServiceError(
					"Õpetaja nimi ei tohi olla pikem kui 100 tähemärki",
					"VALIDATION_ERROR"
				);
			}

			// Kontrolli duplikaate
			const existingTeacher = await TeacherRepository.findByName(data.name);
			if (existingTeacher && existingTeacher.id !== id) {
				throw new TeacherServiceError(
					"Sama nimega õpetaja juba eksisteerib",
					"DUPLICATE_TEACHER"
				);
			}
		}

		if (data.description !== undefined && data.description.length > 255) {
			throw new TeacherServiceError(
				"Kirjeldus ei tohi olla pikem kui 255 tähemärki",
				"VALIDATION_ERROR"
			);
		}

		const updatedTeacher = await TeacherRepository.update(id, data);
		return updatedTeacher!;
	}

	async deleteTeacher(id: number): Promise<void> {
		// Kontrolli, kas õpetaja eksisteerib
		await this.getTeacherById(id);

		await TeacherRepository.delete(id);
	}

	async updateTeacherAvgRating(
		id: number,
		avgRating: number
	): Promise<Teacher> {
		await this.getTeacherById(id);

		const updatedTeacher = await TeacherRepository.updateAvgRating(
			id,
			avgRating
		);
		return updatedTeacher!;
	}
}

export default new TeacherService();
