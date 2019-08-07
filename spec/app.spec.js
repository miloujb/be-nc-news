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
    it('GET /api/articles/article_id returns a 200 message and the article object', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({body}) => {
            expect(body.article).to.have.keys(
                'article_id',
                'title',
                'body',
                'votes',
                'topic',
                'author',
                'created_at', 
                'comment_count' 
            )
        })
    });
    it('GET /api/articles/article_id returns a 400 error if an invalid article id is passed', () => {
        return request(app)
        .get('/api/articles/parsnips')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).to.eql('Bad Request')
        })
    });
    it('GET /api/articles/article_id returns a 404 error if the article_id does not exist', () => {
        return request(app)
        .get('/api/articles/150')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).to.eql('Page Not Found')
        })
    });
    it('PATCH /api/articles/article_id returns a 200 status and an object', () => {
        return request(app)
        .patch('/api/articles/1')
        .send({inc_votes: 1})
        .expect(200)
        .then(({body}) => {
            expect(body.article).to.have.keys( 
                'article_id',
                'title',
                'body',
                'votes',
                'topic',
                'author',
                'created_at'
            )
            expect(body.article.votes).to.equal(101)
        })
    });
    it('PATCH /api/articles/article_id returns a 400 error if an invalid article id is passed', () => {
        return request(app)
        .patch('/api/articles/banana')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).to.eql('Bad Request')
        })
    });
    it('PATCH /api/articles/article_id returns a 404 error if an article id is passed that does not exist', () => {
        return request(app)
        .patch('/api/articles/1155')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).to.eql('Page Not Found')
        })
    });
    it('PATCH /api/articles/article_id returns a 400 status when inc_votes is not a number', () => {
        return request(app)
        .patch('/api/articles/1')
        .send({inc_votes: 'NotANumber'})
        .expect(400)
        .then(({body}) => {
            expect(body.msg).to.eql('Bad Request')
        })
    });
    it('PATCH /api/articles/article_id returns a 200 status if there are no votes on inc_votes', () => {
        return request(app)
        .patch('/api/articles/1')
        .expect(200)
        .then(({body}) => {
            console.log(body)
            expect(body.article.votes).to.eql(101)
        })
    });
    it('POST /api/articles/article_id takes a username and body, and returns the new object', () => {
        return request(app)
        .post('/api/articles/1/comments/')
        .send({username: 'butter_bridge', body: 'Insert vaguely amusing new comment here' })
        .expect(201)
        .then(({body}) => {
            console.log(body.comment)
            expect(body.comment).to.have.keys(
               'author',
               'body',
               'article_id',
               'comment_id',
               'votes',
               'created_at'
            )
            expect(body.comment.author).to.eql('butter_bridge')
            expect(body.comment.comment_id).to.eql(19)
            expect(body.comment).to.be.an('Object')
        })
    })
    it('POST /api/articles/article_id/comments returns a 404 if the article in question does not exist', () => {
        return request(app)
        .post('/api/articles/1355/comments')
        .send({username: 'butter_bridge', body: 'this test should fail'})
        .expect(404)
        .then(({body}) => {
            expect(body.msg).to.eql('Page Not Found')
        })
    });
    it('POST /api/articles/article_id/comments returns a 400 if a bad request is made to the article_id endpoint', () => {
        return request(app)
        .post('/api/articles/raspberry/comments')
        .send({username: 'butter_bridge', body: 'this test should also fail'})
        .expect(400)
        .then(({body}) => {
            expect(body.msg).to.eql('Bad Request')
        })
    });
    it('POST /api/articles/article_id/comments returns a 404 if there is a misspelling in the url', () => {
        return request(app)
        .post('/api/articles/1/commmments')
        .send({username: 'butter_bridge', body: 'we all live in a yellow submarine'})
        .expect(404)
        .then(({body}) => {
            expect(body.msg).to.eql('Page Not Found')
        })
    });
    it.only('GET /api/articles returns a 200 status and an array of article objects', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body})=> {
            expect(body.articles).to.be.an('Array');
        })
    });
});
