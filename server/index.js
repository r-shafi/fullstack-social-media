const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authenticateToken = require('./middlewares/authentication');

require('dotenv').config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(() => console.error('⛔ Error: Unable to Connect to MongoDB!'));

const app = express();

// routes
const registrationRoute = require('./routes/registrationRoute');
const loginRoute = require('./routes/loginRoute');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const followUnfollowRoute = require('./routes/followUnfollowRoute');
const commentRoutes = require('./routes/commentRoute');
const likeUnlikeRoute = require('./routes/likeUnlikeRoute');
const logout = require('./routes/logout');

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.get('/', async (req, res) => {
  res.send('Live!');
});

app.use('/register', registrationRoute);
app.use('/login', loginRoute);
app.use('/logout', logout);
// except for login and register, use authentication middleware
app.use(authenticateToken);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/follow', followUnfollowRoute);
app.use('/comment', commentRoutes);
app.use('/like', likeUnlikeRoute);

mongoose.connection.on('connected', () => {
  app.listen(3000, () => console.log('🎉 http://localhost:3000'));
});
