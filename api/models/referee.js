function Referee (sequelize, DataTypes) {
    const RefereeModel = sequelize.define('referees', {
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

    return RefereeModel;
}

export default Referee;