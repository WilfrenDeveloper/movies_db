const request = require('supertest');
const app = require('../app.js');
const Actor = require('../models/Actor.js');
const Director = require('../models/Director.js');
const Genre = require('../models/Genre.js');
require('../models')

let id;

test('GET /movies debe retornat todas las películas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una película', async () => {
    const newMovie = {
        name: "Pacific Rim",
        image: "https://media.gq.com.mx/photos/5be9d2595c1fcbff3f4c2d9e/master/w_1600%2Cc_limit/pacific_rim__5278.jpg",
        synopsis: "Para pelear a los Kaiju, la humanidad desarrolla robots gigantes llamados Jaegers, diseñados para ser dirigidos por dos humanos.",
        releaseYear: 2013,
    };
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /movies/:id debe actualizar una película', async () => {
    const updateMovie = {
        name: "Titanes del Pacífico"
    };
    const res = await request(app).put(`/movies/${id}`).send(updateMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateMovie.name);
});

test('POST /movies/:id/actors debe insertar todos los actores', async () => {
    const actor = await Actor.create({
        firstName: "Charlie",
        lastName: "Hunnam",
        nationality: "Reino Unido",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Charlie_Hunnam_at_Berlinale_2017.jpeg/250px-Charlie_Hunnam_at_Berlinale_2017.jpeg",
        birthday: "04-10-1980",
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy;
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debe insertar todos los directores', async () => {
    const director = await Director.create({
        firstName: "Charlie",
        lastName: "Hunnam",
        nationality: "Reino Unido",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Charlie_Hunnam_at_Berlinale_2017.jpeg/250px-Charlie_Hunnam_at_Berlinale_2017.jpeg",
        birthday: "04-10-1980",
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy;
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('POST /movie/:id/genres debe insertar todos los géneros', async () => {
    const genre = await Genre.create({
        name : "Comedia"
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id debe eliminar la película', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});