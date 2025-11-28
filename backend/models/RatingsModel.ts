import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../database";

interface RatingAttributes {
	id?: number;
	rating: number;
	description?: string;
	teacherId?: number;
	userId?: number;
	createdAt?: Date;
}

class Rating extends Model<RatingAttributes> implements RatingAttributes {
	public id!: number;
	public rating!: number;
	public description?: string;
	public teacherId?: number;
	public userId?: number;
	public createdAt?: Date;
}

Rating.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		rating: {
			type: DataTypes.TINYINT,
			allowNull: false,
			validate: {
				min: 1,
				max: 5,
			},
		},
		description: {
			type: DataTypes.STRING(400),
			allowNull: false,
		},
	},
	{
		tableName: "ratings",
		sequelize,
		timestamps: true,
		updatedAt: false,
	}
);

export { Rating };
