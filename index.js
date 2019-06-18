const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const helmet = require('helmet');
const LocalStrategy = require('passport-local').Strategy;
const HTTPBearerStrategy = require("passport-http-bearer").Strategy;
const RouteGame = require('./routes').Game;
const RouteUser = require('./routes').User;
const RouteTheme = require('./routes').Theme;
const RouteStatistical = require('./routes').Statistical;
const RouteMood = require('./routes').Mood;
const RouteQuestion = require('./routes').Question;
const Port = process.env.PORT || 4000;
const app = express();

const UserModel = require('./models').User;
const DB_NAME= "Marcelement";
const DB_PORT= 27017;
const DB_HOST= "localhost";

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.use(cors());
app.use(helmet());
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize()); 

passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passReqToCallback: true,
      session: false
    },
    UserModel.authenticateLocal()
  )
);

// bearer is used to authenticate via a token
passport.use(new HTTPBearerStrategy(UserModel.authenticateBearer()));

app.use('/api/games', RouteGame);
app.use('/api/users', RouteUser);
app.use('/api/themes', RouteTheme);
app.use('/api/moods', RouteMood);
app.use('/api/questions', RouteQuestion);
app.use('/api/statistics', RouteStatistical);

app.listen(Port,() =>{
  console.log('Server marcel satrted port :', Port);
});



