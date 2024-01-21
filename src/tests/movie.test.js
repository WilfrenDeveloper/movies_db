const request = require('supertest');
const app = require('../app.js');

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

test('DELETE /movies/:id debe eliminar la película', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});