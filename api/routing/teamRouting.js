import express from 'express';
import * as teamsController from '../controllers/teamsController';

const router = express.Router();

router.get('/', (request, response) => {
    const query = request.query
    teamsController.getAllTeams(query).then(({count, rows}) => {
        if(rows === null){
            response.status(404);
        }

        const payload = {
            teams : rows,
            total: count
        }

        response.send(payload);
    });
});

router.get('/:id', async function (request, response) {
    const id = request.params.id
    const team = await teamsController.getTeamById(id)

    if(id === null || id === undefined){
        response.status(422).send('Missing team id.')
    }

    
    response.send(team)
});

router.post('/', function(req, res){
    if(req.body === undefined) {
        res.status(415).send('Missing body.');
    }

    if(req.body.name === null || req.body.name === undefined){
        res.status(422).send('Missing team name.');
    }
    
    if(req.body.city === null || req.body.city === undefined){
        res.status(422).send('Missing team city.');
    }

    const { name, city } = req.body;

    teamsController.createTeam(name, city).then(function (team){
        res.send(team);
    });
});

router.delete('/:id', function(req, res){
    const name = req.params.id;

    if(name === null || name === undefined){
        res.status(422).send('Missing name parameter.');
    }

    teamsController.deleteTeam(name).then(team =>{
        res.status(204).send();
    });
});

router.put('/:id', async function(req, res){
    const id = req.params.id;
    const teamPayload = req.body;
    if(id === null || id === undefined){
        res.status(422).send('Missing id parameter.');
    }
    const team = await teamsController.updateTeam(id, teamPayload)
    res.status(204).send(team);
});

export default router;