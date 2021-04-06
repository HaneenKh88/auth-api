'use strict';

const { server } = require('../../../src/api-server/server');
const supergoose = require('@code-fellows/supergoose');
// const superTest  = require('supertest');
// const request = superTest(server);
const mockRequest = supergoose(server);


let id;

describe('api V1 test', () => {
    it('should be able to get a module on Get /food', async () => {
      const response = await mockRequest.get('/api/v1/food')
      
      expect(response.status).toEqual(200);
      expect(response.body).toEqual([]);
    });
  
    it('should be able to create a food on POST /food', async () => {
        const response = await mockRequest.post('/api/v1/food').send({
            name: 'pizza',
            calories: '20',
            type: 'PROTIEN',
          
        });
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('pizza');
        id = response.body._id;
      });
 
      it('should be able to get a food on Get /food/:id', async () => {
        const response = await mockRequest.get(`/api/v1/food/${id}`);
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('pizza');
      });

      it('should be able to update a food on PUT /food', async () => {
        const response = await mockRequest.put(`/api/v1/food/${id}`).send({
         
            name: 'soup',
            calories: '20',
            type: 'PROTIEN',
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('soup');
      });

      it('should be able to update a food on PUT /food', async () => {
        const response = await mockRequest.patch(`/api/v1/food/${id}`).send({
         
            name: 'soup',
            calories: '20',
            type: 'PROTIEN',
        });
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('soup');
      });

    
      it('should be able to get all food on Get /food/:id', async () => {
        const response = await mockRequest.get(`/api/v1/food/`);
        expect(response.status).toEqual(200);
        
      });

      it('should be able to delete a food on Get /food/:id', async () => {
        const response = await mockRequest.delete(`/api/v1/food/${id}`);
        expect(response.status).toEqual(200);

});


});
