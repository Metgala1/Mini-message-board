const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;

app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const formRouter = require('./routes/formRouter');
const indexRouter = require('./routes/indexRouter');

app.use('/', indexRouter);
app.use('/', formRouter);

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});

