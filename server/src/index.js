const app = require('./app');
const mongooseConnection = require('./config/mongoose');

mongooseConnection.on('error', (e) => console.log('Failed to connect database', e));
mongooseConnection.once('open', () => console.log('Connected to database'));

const port = process.env.PORT || 3000;
app.listen(port, console.log(`server listening on port ${port}`));
