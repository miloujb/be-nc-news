
# **NC NEWS - Back End Edition**



This is an API that will interact with the Front End of my NC News website. The database is PSQL, and it is interacted with using Knex. It stores articles, users, topics and comments using different endpoints.

The hosted version of this API can be found at [https://backend-nc-news.herokuapp.com/api](https://backend-nc-news.herokuapp.com/api). To view the git repository, please visit [https://github.com/miloujb/be-nc-news](https://github.com/miloujb/be-nc-news).

The Front End site that interacts with this API can be found at [https://nc-news-frontend-edition.netlify.com/](https://nc-news-frontend-edition.netlify.com/)


Clone this repo:

git clone https://github.com/miloujb/be-nc-news

cd be-nc-news

On GitHub create your own ****public**** repository for your project. ****Make sure NOT to initialise it with a README or .gitignore.****

Next, you should hook your local version up to the newly created GitHub repo. Use the following terminal commands, making sure to check the git remotes with each step (`git remote -v`):

git remote remove origin

git remote add origin <YOUR-GITHUB-URL>


You will need the following installed:

  

**Prerequisites**

  

node: v12.0.0

psql V11

npm 6.9

  

  

**Dependencies**

  

"express": "^4.17.1",

"knex": "^0.19.1",

"pg": "^7.12.0"

  

  

**DevDependencies**

  

"chai": "^4.2.0",

"chai-sorted": "^0.2.0",

"mocha": "^6.2.0",

"supertest": "^4.0.2"

  

There is no knexfile in this repo. Make sure to make your own and add it to the .gitignore once finished. If you are on linux, insert your postgres username and password into the knexfile.


Your knexfile should look something like the below:

  

`const ENV = process.env.NODE_ENV || 'development';`
`const { DB_URL } = process.env;`
`const baseConfig = {`
 `client: 'pg',`
 `migrations: {`
 `directory: './db/migrations'`
 `},`
 `seeds: {`
 `directory: './db/seeds'`
 `}`
`};`

`const customConfig = {`

 `development: {`
 `connection: {`
 `database: 'nc_news'`
 `// username,`
 `// password`
 `}`
 `},`
 `production: {`
 ``connection: `${DB_URL}?ssl=true`,``
 `},`
 `test: {`
 `connection: {`
 `database: 'nc_news_test'`
 `// username,`
 `// password`
 `}`
 `}`
`};`

`module.exports = { ...customConfig[ENV], ...baseConfig };`


You have also been provided with a `db` folder with some data, a [setup.sql](https://github.com/miloujb/be-nc-news/blob/master/db/setup.sql) file, a `seeds` folder and a `utils` folder. You should also take a minute to familiarise yourself with the npm scripts you have been provided.
  

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


----------
**Author**

Emily Bailey

**Acknowledgements**

Thank you to Northcoders for the ongoing help and support!
#