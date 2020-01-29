import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import db from './api/models/database';

import refereesRouting from './api/routing/refereeRouting';
import teamsRouting from './api/routing/teamRouting';
import playersRouting from './api/routing/playerRouting';
import coachRouting from './api/routing/coachRouting';
import matchRouting from './api/routing/matchRouting'

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(helmet());
app.use(bodyParser.json());
app.use('/referees', refereesRouting);
app.use('/teams', teamsRouting);
app.use('/players', playersRouting);
app.use('/coaches', coachRouting);
app.use('/matches', matchRouting)

app.listen(4100, function () {
    console.log('API listening on 4100');
});

db.sequelize.sync().then(() => {
    db.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            app.listen(4200, function () {
                console.log('API listening on 4200');
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
});