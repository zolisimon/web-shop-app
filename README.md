# web-shop-app

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster. `mongodb://localhost:27017/` is the default for local development.
- `MONGODB_DB` - The name of the MongoDB db you want to use.
- `NEXTAUTH_URL` - The URL of your app. This is used for callbacks from OAuth providers. `http://localhost:3000` is the default for local development.
- `AUTH_SECRET` & `NEXTAUTH_SECRET` - The same secret key used for signing tokens and hashing passwords. You can generate a random string for this.

### Run Next.js in development mode

```bash
npm install
npm run dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!

Register a user with the name admin and it will have admin rights.
This will allow you to create products and view orders.
