const {Router} = require('express')
const messages = require('../Data/dataBase')

const formRouter = Router()

formRouter.get("/new", (req, res) => {
    res.render("form")
} )

formRouter.post('/new', (req,res) => {
    const {user, text} = req.body;
    messages.push(
        {
            text: text,
            user: user,
            added: new Date()
        }
    )
    res.redirect('/')
})

module.exports = formRouter;