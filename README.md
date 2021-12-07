<div align="center">
  <br>
  <a href="https://where-to-drink.app.jnyiunn.com/"><img src="https://github.com/yasamnoya/where-to-drink/blob/main/client/src/assets/logo.png?raw=true" alt="今晚哪裡喝" width="200"></a>
</div>
<h1 align="center">今晚哪裡喝
</h1>

<h4 align="center">哪裡有人，我就去哪裡喝🍸</h4>

<p align="center">
  <a href="https://where-to-drink.app.jnyiunn.com/"><img src="https://img.shields.io/badge/Deployed%20On-AWS-yellow"></a>
</p>


![screenshot](https://i.imgur.com/0l7JVJZ.png)
![screenshot](https://i.imgur.com/fYFiNw9.png)

# Tech Used

## Backend

- [Express](https://expressjs.com/) - web framework for Node.js
- [mongoose](https://mongoosejs.com/) - ODM for MongoDB
- [Passport](https://www.passportjs.org/) - authentication middleware for Node.js
- [GitHub OAuth](https://developer.github.com/v3/oauth/) - signing in with GitHub accounts

## Frontend

- [Vue](https://vuejs.org/) -  frontend framework
- [Vue router](https://router.vuejs.org/) - the official router for Vue.js
- [axios](https://www.axios.com/) - handling ajax requests

## Deployment

- [Amazon EC2](https://aws.amazon.com/ec2/) - hosting both frontend & backend of the application
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) - hosting the database
- [NGINX](https://www.nginx.com/) - web server as a reverse proxy

# Setup

1. Clone this repository.
2. Create the environment files
  - Create `.env.dev` or `.env.prod` under `server/`, sample as below:
  ```env
  PORT=3000
  FRONTEND_URL=http://localhost:8080
  BACKEND_URL=http://localhost:3000/api
  MONGODB_URL=mongodb://localhost:27017/localhost
  SESSION_SECRET=DrinkingIsMyLife

  YELP_TOKEN=<your yelp api token>

  # OAuth
  GOOGLE_CLIENT_ID=<your google client id>
  GOOGLE_CLIENT_SECRET=<your google client secret>

  FACEBOOK_APP_ID=<your facebook app client id>
  FACEBOOK_APP_SECRET=<your facebook app client secret>
  ```
  - Create `.env.local`under `client/`, sample as below:
  ```env
  VUE_APP_BACKEND_URL=http://localhost:3000/api/
  ```
3. Start the server for development purpose:
```sh
cd server && npm run dev
cd client && npm run serve
```
4. Start the server for production:
```sh
cd server && npm run start
cd client && npm run build
```
Then serve the files under `ciient/dist/` with a http server, i.e. NGINX.

# License

MIT

