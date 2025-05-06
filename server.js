const express = require('express');
const app = express();

app.use(express.json());

const postsRouter = require('./routes/users');

app.use('/posts', postsRouter);

app.listen(3000, () => {
  console.log('The app is waiting on port 3000: http://localhost:3000');
});