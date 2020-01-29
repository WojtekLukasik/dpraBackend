const Team = (sequelize, DataTypes) => {
    const TeamModel = sequelize.define('teams', {
        id:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        city: DataTypes.STRING
    }, {
        timestamps: false,
        underscored: true
    });

    return TeamModel;
}

export default Team;