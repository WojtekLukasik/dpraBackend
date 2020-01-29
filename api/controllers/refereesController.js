import db from '../models/database';

function getAllReferees (query) {
    const { page, size } = query
    let params = {}
    if (typeof +page === 'number' &&  typeof +size === 'number') {
        params = {
            limit: +size,
            offset: (+page - 1) * +size
        }
    }
    return db.sequelize.models.referees.findAndCountAll(params);
}

function createReferee (firstName, lastName, dateOfBirth){
    return db.sequelize.models.referees.create({
        'first_name': firstName,
        'last_name': lastName,
        'date_of_birth': dateOfBirth
    })
}

function deleteReferee (id){
    return db.sequelize.models.referees.destroy({where:{'id' : id}});
}

async function updateReferee(id, {firstName, lastName, dateOfBirth}){
    const referee = await db.sequelize.models.referees.findByPk(id)
    if(!referee){

    }

    if(firstName) {
        referee.first_name = firstName
    }
    
    
    if(lastName) {
        referee.last_name = lastName
    }
    
    if(dateOfBirth) {
        referee.date_of_birth = dateOfBirth
    }

    referee.save()
    return referee
}

export {
    getAllReferees,
    createReferee,
    deleteReferee,
    updateReferee
}