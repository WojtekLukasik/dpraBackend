import express from 'express';
import * as playerController from '../controllers/playersController';

const router = express.Router();

router.get('/', (request, response) =>{
    const query = request.query
    playerController.getAllPlayers(query).then(({count, rows}) =>{
        if(rows === null){
            response.status(404)
        }

        const payload = {
            players: rows,
            total: count
        }
        response.send(payload);
    });
});



router.post('/', function(req, res){
    if(req.body === undefined) {
        res.status(415).send('Missing body.');
    }

    if(req.body.firstName === null || req.body.firstName === undefined){
        res.status(422).send('Missing fist name.');
    }

    if(req.body.lastName === null || req.body.lastName === undefined){
        res.status(422).send('Missing last name.');
    }

    if(req.body.teamId === null || req.body.teamId === undefined){
        res.status(422).send('Missing team ID.');
    }

    if(req.body.dateOfBirth === null || req.body.dateOfBirth === undefined){
        res.status(422).send('Missing date of birth.');
    }
    
    const { firstName, lastName, teamId, dateOfBirth } = req.body;

    playerController.createPlayer(firstName, lastName, teamId, dateOfBirth).
    then(function(player){
        res.send(player);
    });
});

router.delete('/:id', function(req, res){
    const lastName = req.params.id;

    if(lastName === null || lastName === undefined){
        res.status(422).send('Missing lastName parameter.');
    }

    playerController.deletePlayer(lastName).then((player)=>{
        res.status(204).send();
    });
});

router.put('/:id', async function(req, res){
    const id = req.params.id;
    const playerPayload = req.body;
    if(id === null || id === undefined){
        res.status(422).send('Missing id parameter.');
    }
    console.log(playerPayload)

    const player = await playerController.updatePlayer(id, playerPayload)
    res.status(204).send(player);
});

export default router;