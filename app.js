const express = require('express');
const app = express()
const path = require('path')

const messages = require('./Data/dataBase')

app.set("views", path.join(__dirname,"views"))
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))

const formRouter = require('./routes/formRouter');
const indexRouter = require('./routes/indexRouter')



app.get('/new', (req, res) => {
    res.render("form")
})

app.post('/new' , formRouter)

app.get('/', indexRouter);

app.listen(5000, () => {
    console.log("Server running on localhost:5000")
})

module.exports = app;