

module.exports = (sequelize, DataTypes) => {
	const Dogs = sequelize.define('dogs', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			required: true
		},
		breed: {
			type: DataTypes.STRING,
			required: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: DataTypes.DATE
	},
	{
		underscored: true
	});
	return Dogs;
}