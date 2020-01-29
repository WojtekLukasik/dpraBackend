import express, { request, response } from 'express';
import * as matchController from '../controllers/matchController'

const router = express.Router()

router.get('/', (request, response) =>{
    const query = request.query
    matchController.getAllMatches(query).then(({count, rows}) =>{
        if(rows === null){
            response.status(404)
        }

        const payload = {
            matches: rows,
            total: count
        }

        response.send(payload)
    })
})

router.post('/', (req, res) =>{
    if(req.body === undefined) {
        res.status(415).send('Missing body.');
    }

    if(req.body.date === null || req.body.date === undefined){
        res.status(422).send('Missing date.');
    }

    if(req.body.homeTeamId === null || req.body.homeTeamId === undefined){
        res.status(422).send('Missing home team.');
    }

    if(req.body.awayTeamId === null || req.body.awayTeamId === undefined){
        res.status(422).send('Missing away team.');
    }

    if(req.body.refereeId === null || req.body.refereeId === undefined){
        res.status(422).send('Missing referee.');
    }

    const { date, homeTeamId, awayTeamId, refereeId } = req.body
    
    matchController.createMatch(date, homeTeamId, awayTeamId, refereeId).
    then(function(match){
        res.send(match)
    })
})

router.delete('/:id', function(req, res){
    const id = req.params.id

    if(id === null || id === undefined){
        res.status(422).send('Missing id parameter.')
    }

    matchController.deleteMatch(id).then((match)=>{
        res.status(204).send()
    })
})

router.put('/:id', async function(req, res){
    const id = req.params.id
    const matchPayload = req.body
    if(id === null || id === undefined){
        res.status(422).send('Missing id parameter.');
    }
    const match = await matchController.updateMatch(id, matchPayload)
    res.status(204).send(match)
})

export default router