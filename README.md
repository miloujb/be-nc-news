# **NC NEWS - Back End Edition**

This is an API that will interact with the Front End of my NC News website. The database is PSQL, and it is interacted with using Knex. It stores articles, users, topics and comments using different endpoints.

The hosted version of this API can be found at [https://backend-nc-news.herokuapp.com/api](https://backend-nc-news.herokuapp.com/api). To view the git repository, please visit [https://github.com/miloujb/be-nc-news](https://github.com/miloujb/be-nc-news).

The Front End site that interacts with this API can be found at [https://nc-news-frontend-edition.netlify.com/](https://nc-news-frontend-edition.netlify.com/)

**Cloning and Running**

To set up your own repository, please clone this repo, and cd into it, as below.

git clone www.github.com/miloujb/be-nc-news

cd fe-nc-news

To view the project in your browser please run the following command:

npm start

Please ensure the following are installed:

**Prerequisites**

node: v12.0.0

psql V11

npm 6.9

"express": "^4.17.1",

"knex": "^0.19.1",

"pg": "^7.12.0"

"chai": "^4.2.0",

"chai-sorted": "^0.2.0",

"mocha": "^6.2.0",

"supertest": "^4.0.2"

If you do not have the above installed, please run the following command:

npm install

### **Routes**

The server has the below ten endpoints,

GET /api/topics, which serves a list of topics

GET /api/users/:username, which serves the details pertaining to a specific user

GET /api/articles/:article_id, which responds with the article corresponding to the article_id passed in

PATCH /api/articles/:article_id modifies the votes on the article in question

POST /api/articles/:article_id/comments adds a new comment to the requested article

GET /api/articles/:article_id/comments gets all the comments belonging to the requested article

GET /api/articles gets all the articles in the database

PATCH /api/comments/:comment_id modifies the votes on the article in question

DELETE /api/comments/:comment_id deletes the requested comment

GET /api serves a json object of the information passed in

---

**Author**

Emily Bailey

**Acknowledgements**

Thank you to Northcoders for the ongoing help and support!

#
