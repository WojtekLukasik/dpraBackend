import db from '../models/database';

function getAllMatches(query){
    const {page, size} = query
    let params = {}
    if (typeof +page === 'number' &&  typeof +size === 'number') {
        params = {
            limit: +size,
            offset: (+page - 1) * +size
        }
    }
    return db.sequelize.models.matches.findAndCountAll(params);
}

function createMatch(date, homeTeamId, awayTeamId, refereeId){
    return db.sequelize.models.matches.create({
        'date' : date,
        'home_team_id': homeTeamId,
        'away_team_id': awayTeamId,
        'referee_id': refereeId
    })
}

function deleteMatch(id){
    return db.sequelize.models.matches.destroy({where:{'id':id}})
}

async function updateMatch(id, {date, homeTeamId, awayTeamId, refereeId}){
    const match = await db.sequelize.models.matches.findByPk(id)
    if(!match){

    }

    if(date){
        match.date = date
    }

    if(homeTeamId){
        match.home_team_id = homeTeamId
    }

    if(awayTeamId){
        match.away_team_id = awayTeamId
    }

    if(refereeId){
        match.referee_id = refereeId
    }

    match.save()
    return match
}

export{
    getAllMatches,
    createMatch,
    deleteMatch,
    updateMatch
}