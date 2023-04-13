## stats.space

[![Netlify Status](https://api.netlify.com/api/v1/badges/82bca42e-6599-4cbe-8b4f-cf45d7db1b3a/deploy-status)](https://app.netlify.com/sites/stats-space/deploys)

Front-end repository for [stats.space](https://stats.space)

Back-end repository: [github.com/Tenemo/stats-space-backend](https://github.com/Tenemo/stats-space-backend)

### Caching

Since the data used doesn't get stale quickly, the front-end application caches the full dataset once it is loaded, working offline after the initial connection.

### Local environment setup

#### Front-end:

1. Install Node.js, at least 16.17.1, include `npm` in installation.
2. `npm install`
3. `npm start`
   Front-end will try to connect, by default, to the API at http://localhost:4000.

#### Back-end:

1. Install Node.js, at least 16.14, include `npm` in installation.
2. Install Docker.
3. Clone the [back-end repo](github.com/Tenemo/stats-space-backend): `git clone git@github.com:Tenemo/stats-space-backend.git`.
4. `docker compose up -d`
5. `npm install`
6. `npm run nodemon`
   Back-end will run on port 4000 by default. Postman collection [available here](https://github.com/Tenemo/stats-space-backend/blob/master/postman/stats-space.postman_collection.json).

### Stack

-   Front-end: [TypeScript](https://www.typescriptlang.org/), [React](https://react.dev/), [Redux](https://redux.js.org/), [MaterialUI](https://mui.com/), [Babel](https://babeljs.io/), [Webpack](https://webpack.js.org/)
-   Back-end: [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com/), [Babel](https://babeljs.io/)
-   Static code analysis: [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/)
-   Code formatting: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
-   Domain registrar: [Namecheap](https://www.namecheap.com/)
-   DNS: [Netlify](https://www.netlify.com/)
-   TLS certificates: [Let's Encrypt](https://letsencrypt.org/) automatically managed and auto-renewed via [Netlify](https://www.netlify.com/)
-   Version Control System: [GitHub](https://github.com/)
-   Front-end hosting + CDN: [Netlify](https://www.netlify.com/)
-   Back-end hosting: [Heroku](https://heroku.com)
-   Database: [Heroku Postgres](https://www.heroku.com/postgres)
-   CI/CD: [GitHub](https://github.com/) integrations with [Heroku](https://heroku.com) and [Netlify](https://www.netlify.com/), automatic `master` branch deployments to production environments for both repositories after automatic code quality checks and tests. [Husky](https://typicode.github.io/husky/#/) prevents committing code that doesn't meet the below checks, too. These are run before every deployment with any errors aborting the deployment:
    1. Code static analysis passes with no errors, including enforcing automatic formatting. Additionally, CSS/SCSS static analysis on front-end.
    2. Typechecking passes with no errors.
    3. Tests pass with no errors.

### Data sources

-   Launch data: [https://ll.thespacedevs.com/2.2.0/launch/](https://ll.thespacedevs.com/2.2.0/launch/)
-   Launch service providers: [https://ll.thespacedevs.com/2.2.0/agencies/](https://ll.thespacedevs.com/2.2.0/agencies/)
-   World Development Indicators data: [https://datacatalog.worldbank.org/search/dataset/0037712](https://datacatalog.worldbank.org/search/dataset/0037712), indicators list: [https://data.worldbank.org/indicator/](https://data.worldbank.org/indicator/)
-   Country codes mapping: [https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/blob/master/slim-3/slim-3.json](https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/blob/master/slim-3/slim-3.json)

### To-do (maybe):

-   favicon
