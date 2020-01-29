const Coach = (sequelize, DataTypes) =>{
    const CoachModel = sequelize.define('coaches', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        date_of_birth: DataTypes.DATE
    }, {
        timestamps: false,
        underscored: true
    });

    CoachModel.associate = (models) =>{
        CoachModel.belongsTo(models.teams);
    };

    return CoachModel;
}

export default Coach;