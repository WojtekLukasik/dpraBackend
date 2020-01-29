const Player = (sequelize, DataTypes) =>{
    const PlayerModel = sequelize.define('players', {
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

    PlayerModel.associate = (models) =>{
        PlayerModel.belongsTo(models.teams);
    };

    return PlayerModel;
}

export default Player;