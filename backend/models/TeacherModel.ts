import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../database";

interface TeacherAttributes {
	id?: number;
	name: string;
	description?: string;
	avgRating?: number;
	updatedAt?: Date;
}

class Teacher extends Model<TeacherAttributes> implements TeacherAttributes {
	public id!: number;
	public name!: string;
	public description?: string;
	public avgRating?: number;
	public updatedAt?: Date;
}

Teacher.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		avgRating: {
			type: DataTypes.DECIMAL(3, 2),
			allowNull: false,
			defaultValue: 0.0,
		},
	},
	{
		tableName: "teachers",
		sequelize,
		timestamps: true,
		createdAt: false,
	}
);

export { Teacher };
