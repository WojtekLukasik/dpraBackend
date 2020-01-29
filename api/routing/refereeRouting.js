import express from 'express';
import * as refereesController from '../controllers/refereesController';

const router = express.Router();

router.get('/', function (request, response) {
    const query = request.query
    refereesController.getAllReferees(query).then(({count, rows}) =>{
        if(rows === null){
            response.status(404)
        }

        const payload = {
            referees: rows,
            total: count
        }
        response.send(payload);
    })
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

    if(req.body.dateOfBirth === null || req.body.dateOfBirth === undefined){
        res.status(422).send('Missing date of birth.');
    }

    const { firstName, lastName, dateOfBirth } = req.body;

    refereesController.createReferee(firstName, lastName, dateOfBirth).then(function(referee){
        res.send(referee);
    });
});

router.delete('/:id', function(req, res){
    const id = req.params.id;

    if(id === null || id === undefined){
        res.status(422).send('Missing id parameter.');
    }

    refereesController.deleteReferee(id).then((referee)=>{
        res.status(204).send();
    });
});

router.put('/:id', async function(req, res) {
    const id = req.params.id;
    const refereePayload = req.body;
    if(id === null || id === undefined){
        res.status(422).send('Missing id parameter.');
    }

    const referee = await refereesController.updateReferee(id, refereePayload);
    res.status(204).send(referee);
});

export default router;