const {Router} = require('express')
const queries = require('../db/queries')


const formRouter = Router()

formRouter.get("/new", (req, res) => {
    res.render("form")
} )

formRouter.post('/new', async (req, res) => {
  const { name, message } = req.body;

  try {
    await queries.addMessage(name, message);  
    res.redirect('/');  
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).send('Server Error');
  }
});



module.exports = formRouter;