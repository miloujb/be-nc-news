process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiSorted = require('chai-sorted');
chai.use(chaiSorted);
const { expect } = require('chai')
const app = require('../app');
const request = require('supertest');
const connection = require('../db/data/connection');

describe('/api/', () => {
    after(() => {
        connection.destroy();
    })
    beforeEach(() => {
        return connection.seed.run();
    });
    it('GET /api/topics returns all topic information', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
           expect(body.topics).to.be.an('Array')
           expect(body.topics[0]).to.be.an('Object');
       }) 
    });
    it('GET /api/topics returns a 404 error message when the endpoint is misspelled', () => {
        return request(app)
        .get('/api/topicsss')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).to.equal('Page Not Found')
        })
    });
    it('GET /api/users/:username returns the user object', () => {
        return request(app)
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(({body}) => {
            expect(body.user).to.be.an('Array')
            expect(body.user[0]).to.have.all.keys(
                'username',
                'avatar_url',
                'name'
            )
        })
    })
    it('GET /api/users/:username returns a 404 if the username does not exist', () => {
        return request(app)
        .get('/api/users/turnipss')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).to.equal('Page Not Found')
        })
    });

});
