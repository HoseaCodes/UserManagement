const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const cors = require("cors");

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	fileUpload({
		useTempFiles: true,
	})
);
app.use(cors({	origin: "*"	}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mounted Routes
const userRouter = require('./routes/user');
const uploadRouter = require('./routes/upload');

app.use('/user', userRouter);
app.use("/api", uploadRouter);

app.get("/health", (req, res) => {
  res.send({health: 200})
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))