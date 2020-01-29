import db from '../models/database';

function getAllCoaches(query){
    const { page, size } = query
    let params = {}
    if (typeof page === 'number' &&  typeof size === 'number') {
        params = {
            limit: size,
            offset: (page - 1) * size
        }
    }
    return db.sequelize.models.coaches.findAndCountAll(params);
}

function createCoach(firstName, lastName, teamId, dateOfBirth){
    return db.sequelize.models.coaches.create({
        'first_name': firstName,
        'last_name': lastName,
        'date_of_birth': dateOfBirth,
        'team_id': teamId
    })
}

function deleteCoach(id){
    return db.sequelize.models.coaches.destroy({where:{'id': id}});
}

async function updateCoach(id, {firstName, lastName, teamId, dateOfBirth}){
    const coach = await db.sequelize.models.coaches.findByPk(id)
    if(!coach){

    }

    if(firstName) {
        coach.first_name = firstName
    }
    
    
    if(lastName) {
        coach.last_name = lastName
    }
    
    if(teamId) {
        coach.team_id = teamId
    }
    
    if(dateOfBirth) {
        coach.date_of_birth = dateOfBirth
    }

    coach.save()
    return coach
}

export{
    getAllCoaches,
    createCoach,
    deleteCoach,
    updateCoach
}