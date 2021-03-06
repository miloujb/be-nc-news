process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiSorted = require('chai-sorted');
chai.use(chaiSorted);
const { expect } = require('chai')
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

describe('/api/', () => {
    beforeEach(() => {
        return connection.seed.run();
    });
    after(() => {
        connection.destroy();
    })
    describe('TOPICS', () => {
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
        it("POST/PATCH/DELETE- status 405 “method not allowed” message when trying to post, patch or delete a topic", () => {
            const invalidMethods = ['post', 'patch', 'delete'];
            const methodPromises = invalidMethods.map(method => {
                return request(app)
                [method]('/api/topics')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal("Method Not Allowed")
                    });
            });
            return Promise.all(methodPromises);
        });
    });
    describe('USERS', () => {
        it('GET /api/users/:username returns the user object', () => {
            return request(app)
            .get('/api/users/butter_bridge')
            .expect(200)
            .then(({body}) => {
                expect(body).to.be.an('Object')
                expect(body.user).to.have.all.keys(
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
        it("POST/PATCH/DELETE- returns 405 status when trying to post, patch or delete a user", () => {
            const invalidMethods = ["post", "patch", "delete"];
            const methodPromises = invalidMethods.map(method => {
                return request(app)
                [method]("/api/users/butter_bridge")
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal("Method Not Allowed");
                    });
                });
                return Promise.all(methodPromises);
            });
        });
    describe('ARTICLES', () => {
        it('GET /api/articles/article_id returns a 200 and the article object', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body})=> {
                expect(body.article).to.be.an('Object')
            })
        })
        it('GET /api/articles/article_id returns a 200 message and the article object with the correct keys', () => {
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
            it('GET /api/articles/article_id returns a 404 error if an invalid article id is passed', () => {
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
            it('GET /api/articles/article_id returns a 404 if the endpoint is misspelled', () => {
                return request(app)
                .get('/api/articlesssss/1')
                .expect(404)
                .then(({body})=>{
                    expect(body.msg).to.eql('Page Not Found')
                })
            });
            it('GET /api/articles/article_id returns an input of null as 0', () => {
                return request(app)
                .get('/api/articles/2')
            .expect(200)
            .then(({body})=> {
                expect(body.article.votes).to.eql(0)
                expect(body.article.comment_count).to.eql(0)
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
            it('PATCH /api/articles/article_id ignores a patch request with no information in request body', () => {
                return request(app)
                .patch('/api/articles/1')
                .expect(200)
                .then(({body})=> {
                    expect(body.article.votes).to.eql(100)
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
        it('PATCH /api/articles/article_id returns a 200 and an updated object if inc_votes is a negative number', () => {
            return request(app)
            .patch('/api/articles/1')
            .send({inc_votes : -10})
            .expect(200)
            .then(({body}) => {
              expect(body.article).to.have.keys(
              'article_id',
              'title',
              'topic',
              'author',
              'body',
              'created_at',
              'votes'
              )
              expect(body.article.votes).to.eql(90)
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
        it('POST /api/articles/article_id takes a username and body, and returns the new object', () => {
            return request(app)
            .post('/api/articles/1/comments/')
            .send({username: 'butter_bridge', body: 'Insert vaguely amusing new comment here' })
            .expect(201)
            .then(({body}) => {
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
        it('POST returns a 400 error when the post request does not include all of the required keys', () => {
            return request(app)
            .post('/api/articles/1/comments/')
            .send({username: 'butter_bridge'})
            .expect(400)
            .then(({body})=> {
            expect(body.msg).to.eql('Bad Request')
            })
        });
    it('GET /api/articles returns a 200 status and an array of article objects', () => {
        return request(app)
         .get('/api/articles')
         .expect(200)
         .then(({body})=> {
             expect(body.articles).to.be.an('Array');
             expect(body.articles[0]).to.have.keys(
                'author',
                'body',
                'title',
                'article_id',
                'topic',
                'created_at',
                'votes',
                'comment_count'
            )
         })
    });   
     it('GET /api/articles can sort the array of articles, defaulting to date', () => {
         return request(app)
         .get('/api/articles?sort_by=created_at')
         .expect(200)
         .then(({body})=> {
             expect(body.articles).to.be.descendingBy('created_at')
         })   
     });
     it('GET /api/articles can sort the array of articles to a column other than the default', () => {
         return request(app)
         .get('/api/articles?sort_by=article_id')
         .expect(200)
         .then(({body})=> {
             expect(body.articles).to.be.descendingBy('article_id')
         })
     });
     it('GET /api/articles orders the articles in ascending order', () => {
         return request(app)
         .get('/api/articles?sort_by=created_at&order=asc')
         .expect(200)
         .then(({body})=> {
             expect(body.articles).to.be.sortedBy('created_at', {descending: false})
         })
     });
     it('GET /api/articles returns 404 if the endpoint is spelled incorrectly', () => {
         return request(app)
         .get('/api/articlessss')
         .expect(404)
         .then(({body})=> {
             expect(body.msg).to.eql('Page Not Found')
         })
     });
     it('GET /api/articles returns a 400 if the sort_by request is invalid', () => {
         return request(app)
         .get('/api/articles?sort_by=44')
         .expect(400)
         .then(({body})=> {
             expect(body.msg).to.eql('Bad Request')
         })
     });
     it('GET /api/articles will default to descending order if an invalid request is made to the order request', () => {
         return request(app)
         .get('/api/articles?sort_by=created_at&order=fish')
         .expect(200)
         .then(({body})=> {
             expect(body.articles).to.be.sortedBy('created_at')
         })
        });
    it('GET /api/articles filters the articles by the author, which is returned as an array', () => {
            return request(app)
            .get('/api/articles?author=butter_bridge')
            .expect(200)
            .then(({body})=> {
                expect(body.articles).to.be.an('Array')
                expect(body.articles[0]).to.be.an('Object')
            })
        });
    it('GET /api/articles filters the articles by the author, which is the same as the author declared in the query', () => {
            return request(app)
            .get('/api/articles?author=butter_bridge')
            .expect(200)
            .then(({body}) => {
                expect(body.articles[0].author).to.eql('butter_bridge')
            })
        });
    it('GET /api/articles filters the articles by topic, and returns an array of objects', () => {
        return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({body})=> {
            expect(body.articles).to.be.an('Array')
            expect(body.articles[0]).to.be.an('Object')
        })
    });
    it('GET /api/articles filters the articles by topic, which is the same as the topic declared in the query', () => {
        return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({body})=>{
            expect(body.articles[0].topic).to.eql('mitch')
        })
    });
    it('GET /api/articles returns a 404 if the topic passed in req.query is undefined', () => {
        return request(app)
        .get('/api/articles?topic=spinach')
        .expect(404)
        .then(({body})=> {
            expect(body.msg).to.eql('Page Not Found')
        })
    });
    it('GET /api/articles returns a 404 if the author passed in req.query is undefined ', () => {
        return request(app)
        .get('/api/articles?author=pineapple')
        .expect(404)
        .then(({body})=> {
            expect(body.msg).to.eql('Page Not Found')
        })
    });
    it("ERROR - status 405 “Method Not Allowed” message when trying to delete an article", () => {
        const invalidMethods = ['post', 'patch', 'delete'];
        const methodPromises = invalidMethods.map(method => {
            return request(app)
            [method]('/api/articles')
                .expect(405)
                .then(({ body }) => {
                    expect(body.msg).to.equal("Method Not Allowed")
                });
        });
        return Promise.all(methodPromises);
    });
    });
    describe('COMMENTS', () => {
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
        it('GET /api/articles/article_id/comments retuns a 200 and an array of comment objects', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body})=> {
                expect(body.comments[0]).to.have.keys(
                    'article_id',
                    'comment_id',
                    'votes',
                    'created_at',
                    'author',
                    'body'
                )
            })
        });
        it('GET /api/articles/article_id/comments returns a 200 when the article exists, and an empty array of comments when there are no comments on the article', () => {
            return request(app)
            .get('/api/articles/2/comments')
            .expect(200)
            .then(({body})=>{
                expect(body.comments).to.eql([])
            })  
        });
        it('GET /api/articles/article_id/comments returns an array of comment objects with the same article_id', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) => {
                expect(body.comments[0].article_id).to.eql(1)
            })
        });
        it('GET /api/articles/article_id/comments returns a 404 if there is a spelling error in the endpoint', () => {
            return request(app)
            .get('/api/articles/1/commmments')
            .expect(404)
            .then(({body}) => {
                expect(body.msg).to.eql('Page Not Found')
            })
        });
        it('GET /api/articles/article_id/comments returns a 400 error if an invalid article_id is passed', () => {
            return request(app)
            .get('/api/articles/blackberries/comments')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).to.eql('Bad Request')
            })
        });
        it('GET /api/articles/article_id/comments returns a 404 error if the article does not exist', () => {
            return request(app)
            .get('/api/articles/16400/comments')
            .expect(404)
            .then(({body})=> {
                expect(body.msg).to.eql('Page Not Found')
            })
        });
        it('GET /api/articles/article_id/comments returns an array of comment objects sorted by the default of created_at', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=created_at')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).to.be.descendingBy('created_at')
            })
        });
        it('GET /api/articles/article_id/comments returns an array sorted by created_at in desc order', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).to.be.descendingBy('created_at', {ascending: false})
            })
        });
        it('GET /api/articles/article_id/comments can be changed to sort by comment_id', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=comment_id')
            .expect(200)
            .then(({body})=> {
                expect(body.comments).to.be.descendingBy('comment_id')
            })
        });
        it('GET /api/articles/article_id/comments can be changed to sort by votes in descending order', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=votes')
            .expect(200)
            .then(({body})=> {
                expect(body.comments).to.be.descendingBy('votes', {ascending: false})
            })
        });
        it('GET /api/articles/article_id/comments can be changed to sort by author', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=author')
            .expect(200)
            .then(({body})=> {
                expect(body.comments).to.be.descendingBy('author')
            })
        });
        it('GET /api/articles/article_id/comments returns a 400 if a request is made to a column that does not exist', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=NotAColumn')
            .expect(400)
            .then(({body}) => {
                expect(body.msg).to.eql('Bad Request')
            })
        });
        it('GET/api/articles/article_id/comments returns an array of comments sorted by created_at, changed to ascending order', () => {
            return request(app)
            .get('/api/articles/1/comments?order=asc')
            .expect(200)
            .then(({body})=> {
                expect(body.comments).to.be.sortedBy('created_at')
                expect(body.comments).to.be.an('Array')
            })
        });
        it('GET /api/articles/article_id/comments can return an array sorted by comment_id, changed to ascending order', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=comment_id&order=asc')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).to.be.sortedBy('comment_id');
            })
        });
        it('GET /api/articles/article_id/comments can sort by votes in ascending order', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=votes&order=asc')
            .expect(200)
            .then(({body}) => {
                expect(body.comments).to.be.sortedBy('votes');
            })
        });
        it('GET /api/articles/article_id/comments can sort by author in ascending order', () => {
            return request(app)
            .get('/api/articles/1/comments?sort_by=author&order=asc')
            .expect(200)
            .then(({body})=> {
                expect(body.comments).to.be.sortedBy('author');
            })
        });
        it('GET /api/articles/article_id/comments returns a 404 if there is a spelling error', () => {
            return request(app)
            .get('/api/articles/1/commentds??sort_by=author&order=as')
            .then(({body})=> {
                expect(body.msg).to.eql('Page Not Found')
            })
        });
        it('PATCH /api/comments/comment_id returns a 200 and an updated object when inc_votes is a positive number', () => {
            return request(app)
            .patch('/api/comments/1')
            .send({inc_votes: 1})
            .expect(200)
            .then(({body}) => {
                expect(body.comment).to.have.keys( 
                    'article_id',
                    'comment_id',
                    'body',
                    'votes',
                    'author',
                    'created_at'
                )
                expect(body.comment.votes).to.equal(17)
                expect(body.comment).to.be.an('Object')
            });
        })
        it('PATCH /api/comments/comment_id returns a 200 and original object when inc_votes is set to 0', () => {
            return request(app)
            .patch('/api/comments/1')
            .expect(200)
            .then(({body}) => {
                expect(body.comment).to.have.keys( 
                    'article_id',
                    'comment_id',
                    'body',
                    'votes',
                    'author',
                    'created_at'
                )
                expect(body.comment.votes).to.equal(16)
                expect(body.comment).to.be.an('Object')
            });
        })
        it('PATCH /api/comments/comment_id returns a 200 and an update object when inc_votes is a negative number', () => {
        return request(app)
        .patch('/api/comments/1')
        .send({inc_votes: -5})
        .expect(200)
        .then(({body}) => {
            expect(body.comment).to.have.keys( 
                'article_id',
                'comment_id',
                'body',
                'votes',
                'author',
                'created_at'
            )
            expect(body.comment.votes).to.equal(11)
            expect(body.comment).to.be.an('Object')
    });
        });
        it('PATCH /api/comment/:comment_id returns a 400 status when inc_votes is not a number', () => {
            return request(app)
            .patch('/api/comments/1')
            .send({ inc_votes : 'apple' })
            .expect(400)
            .then(({body}) => {
              expect(body.msg).to.eql('Bad Request')
            }) 
        });
        it('PATCH /api/comments/comment_id returns a 404 not found if a valid comment_id is passed that does not exist', () => {
            return request(app)
            .patch('/api/comments/1000')
            .send({inc_votes : 1})
            .expect(404)
            .then(({body})=> {
                expect(body.msg).to.eql('Page Not Found')
            })
        });
        it('DELETE /api/comments/:comment_id returns a 204 if successful', () => {
            return request(app)
            .delete('/api/comments/1')
            .expect(204)
        });
        it('DELETE /api/comments/:comment_id returns a 400 status if endpoint is invalid, i.e., not a number', () => {
            return request(app)
            .delete('/api/comments/satsuma')
            .expect(400)
            .then(({body})=> {
                expect(body.msg).to.eql('Bad Request')
            })
        });
        it('DELETE /api/comments/:comment_id returns a 404 status if comment_id does not exist', () => {
            return request(app)
            .delete('/api/comments/239')
            .expect(404)
            .then(({body})=> {
                expect(body.msg).to.eql('Page Not Found')
            })
        });
        it("ERROR - status 405 “method not allowed” message when trying to get & post a comment", () => {
            const invalidMethods = ['get', 'post'];
            const methodPromises = invalidMethods.map(method => {
                return request(app)
                [method]('/api/comments/3')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body.msg).to.equal("Method Not Allowed")
                    });
            });
            return Promise.all(methodPromises);
        });
    })
    describe('API', () => {
        it('returns a json object', () => {
            return request(app)
            .get('/api/')
            .expect(200)
            .then((json)=> {
                expect(json).to.be.an('Object')
            })
        });
        it('ERROR returns a 405 message when trying to delete the api', () => {
            const invalidMethods = ['delete'];
            const methodPromises = invalidMethods.map(method => {
                return request(app)
                [method]('/api/')
                    .expect(405)
                    .then(({body})=> {
                        expect(body.msg).to.eql('Method Not Allowed')
                    })
            })
            return Promise.all(methodPromises)
        });
    });
});
