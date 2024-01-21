const request = require('supertest');
const app = require('../app.js');

let id;

test('GET /actors debe retornar todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const newActor = {
        firstName: "Charlie",
        lastName: "Hunnam",
        nationality: "Reino Unido",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Charlie_Hunnam_at_Berlinale_2017.jpeg/250px-Charlie_Hunnam_at_Berlinale_2017.jpeg",
        birthday: "04-10-1980",
    };
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
    expect(res.body.id).toBeDefined();
});

test('PUT /actors/:id debe actualizar un actor por su id', async () => {
    const updateActor= {
        firstName: "Carlos"
    };
    const res = await request(app).put(`/actors/${id}`).send(updateActor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateActor.firstName);
});

test('DELETE /actors/:id debe eliminar un actor por su id', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});