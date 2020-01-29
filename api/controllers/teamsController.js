import db from '../models/database';

function getAllTeams(query){
    const { page, size } = query
    let params = {}
    if (typeof page === 'number' &&  typeof size === 'number') {
        params = {
            limit: size,
            offset: (page - 1) * size
        }
    }
    return db.sequelize.models.teams.findAndCountAll(params);
}

function createTeam(name, city){
    return db.sequelize.models.teams.create({
        'name': name,
        'city': city
    })
}

function deleteTeam(name){
    return db.sequelize.models.teams.destroy({where:{'name' : name}});
}

function getTeamById(id){
    const team =  db.sequelize.models.team.findById(id);
    return team
}

async function updateTeam(id, {name, city}){
    const team  = await db.sequelize.models.teams.findByPk(id)
    if(!team){

    }

    if(name){
        team.name = name
    }

    if(city){
        team.city = city
    }

    team.save()
    return team
}

export{
    getAllTeams,
    createTeam,
    deleteTeam,
    getTeamById,
    updateTeam
}