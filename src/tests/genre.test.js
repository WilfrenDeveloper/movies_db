const request = require('supertest');
const app = require('../app.js');

let id;

test('GET /genres debe retornar todos los géneros', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear un género', async () => {
    const newGenre = {
        name: "Terror"
    };
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /genres/:id debe actualizar un id', async () => {
    const updateGenre = {
        name: "Comedia"
    }
    const res = await request(app).put(`/genres/${id}`).send(updateGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateGenre.name);
});

test('DELETE /genres/:id debe eliminar un género', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});