import db from '../models/database';
import Teams from '../models/teams';

function getAllPlayers(query){
    const { page, size } = query
    let params = {}
    // if (typeof page === 'number' &&  typeof size === 'number') {
    //     params = {
    //         limit: size,
    //         offset: (page - 1) * size
    //     }
    // }
    if (typeof +page === 'number' &&  typeof +size === 'number') {
        params = {
            limit: +size,
            offset: (+page - 1) * +size
        }
    }

    console.log('controler')
    console.log(params)
    return db.sequelize.models.players.findAndCountAll(params);
}

function createPlayer(firstName, lastName, teamId, dateOfBirth){
    return db.sequelize.models.players.create({
        'first_name': firstName,
        'last_name': lastName,
        'date_of_birth': dateOfBirth,
        'team_id': teamId
    })
}

function deletePlayer(id){
    return db.sequelize.models.players.destroy({where:{'id': id}});
}

async function updatePlayer(id, {firstName, lastName, teamId, dateOfBirth}){
    const player = await db.sequelize.models.players.findByPk(id)
    if (!player) {

    }

    if(firstName) {
        player.first_name = firstName
    }
    
    
    if(lastName) {
        player.last_name = lastName
    }
    
    if(teamId) {
        player.team_id = teamId
    }
    
    if(dateOfBirth) {
        player.date_of_birth = dateOfBirth
    }

    player.save()
    return player
}
export{
    getAllPlayers,
    createPlayer,
    deletePlayer,
    updatePlayer
}