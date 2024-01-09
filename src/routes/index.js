const express = require('express');
const actorRouter = require('./actor.router');
const directorRouter = require('./director.router');
const genreRouter = require('./genre.router');
const movieRouter = require('./movie.router');
const router = express.Router();

router.use(actorRouter);
router.use(directorRouter);
router.use(genreRouter);
router.use(movieRouter)

module.exports = router;