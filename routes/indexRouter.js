const {Router} = require('express')
const queries = require('../db/queries')

const indexRouter = Router();

indexRouter.get('/', async (req, res) => {
  try {
    const messages = await queries.getMessages(); // Fetch messages
    res.render('index', { messages }); // Pass to template
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server Error');
  }
});
indexRouter.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
   console.log('DELETE ROUTE HIT!', req.params); 

  try {
    await queries.deleteMessage(id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = indexRouter