const Match = (sequelize, DataTypes) =>{
    const MatchModel = sequelize.define('matches',{
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        date: DataTypes.DATE,

    },{
        timestamps: false,
        underscored: true
    });

    MatchModel.associate = (models) =>{
        MatchModel.belongsTo(models.teams, {foreignKey:'home_team_id'});
        MatchModel.belongsTo(models.teams, {foreignKey:'away_team_id'});
        MatchModel.belongsTo(models.referees, {foreignKey: 'referee_id'})
    };

    return MatchModel
}

export default Match;