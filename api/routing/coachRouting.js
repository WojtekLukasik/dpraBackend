import express, { response } from 'express';
import * as coachController from '../controllers/coachController';

const router = express.Router();

router.get('/', (request, response) =>{
    const query = request.query
    coachController.getAllCoaches(query).then(({count, rows}) =>{
        if(rows === null){
            response.status(404)
        }

        const payload = {
            coaches: rows,
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
        res.status(422).send('Missing team.');
    }

    if(req.body.dateOfBirth === null || req.body.dateOfBirth === undefined){
        res.status(422).send('Missing date of birth.');
    }
    
    const { firstName, lastName, teamId, dateOfBirth } = req.body;

    coachController.createCoach(firstName, lastName, teamId, dateOfBirth).then(function(coach){
        res.send(coach);
    });
});

router.delete('/:id', function(req, res){
    const id = req.params.id;

    if(id === null || id === undefined){
        res.status(422).send('Missing lastName parameter.');
    }

    coachController.deleteCoach(id).then((coach)=>{
        res.status(204).send();
    });
});

router.put('/:id', async function(req, res){
    const id = req.params.id;
    const coachPayload = req.body;
    if(id === null || id === undefined){
        res.status(422).send('Missing id parameter.');
    }
    console.log(coachPayload)

    const coach = await coachController.updateCoach(id, coachPayload)
    res.status(204).send(coach);
});

export default router;