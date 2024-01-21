const request = require('supertest');
const app = require('../app.js');

let id;

test('GET /directors debe retornar todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
    const newDirector = {
        firstName: "Charlie",
        lastName: "Hunnam",
        nationality: "Reino Unido",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Charlie_Hunnam_at_Berlinale_2017.jpeg/250px-Charlie_Hunnam_at_Berlinale_2017.jpeg",
        birthday: "04-10-1980",
    };
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
    expect(res.body.id).toBeDefined();
});

test('PUT /directors/:id debe actualizar un director por su id', async () => {
    const updateDirector= {
        firstName: "Carlos"
    };
    const res = await request(app).put(`/directors/${id}`).send(updateDirector);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateDirector.firstName);
});

test('DELETE /directors/:id debe eliminar un director por su id', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});