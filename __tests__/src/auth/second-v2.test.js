'use strict';
require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');
const Users = require('../../../src/api-server/auth/models/users');
const { server } = require('../../../src/api-server/server');
const request = supergoose(server);

let id;
let SECRET = process.env.SECRET || 'supersecret';
let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

beforeAll(async (done) => {
  await new Users(users.admin).save();
  done();
});

const user = { username: 'admin' };
const token = jwt.sign(user, SECRET);

const basic = { username: 'basic' };
const basicToken = jwt.sign(basic, SECRET);

describe('clothes', () => {

  it('should be able to create a food on POST /food', async () => {
        const response = await request.post('/api/v2/food').send({
          name: 'pizza',
          calories: '20',
          type: 'PROTIEN',
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('pizza');
        id = response.body._id;
  });

  it('should be able to read data from GET /clothes', async () => {
        const response = await request.get(`/api/v2/food/${id}`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('pizza');
  });

  it('read all from DataBase test on GET /food', async () => {
        const response = await request.get('/api/v2/food')
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
  });

  it('should be able to update data on PUT /food', async () => {
    const response = await request
      .put(`/api/v2/food/${id}`)
      .send({
        name: 'pizza',
        calories: '20',
        type: 'PROTIEN',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('pizza');
  });
  
  it('should be able to delete data on DELETE /food', async () => {
    const response = await request
      .delete(`/api/v2/food/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
});