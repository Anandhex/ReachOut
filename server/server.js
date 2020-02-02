const mongoose = require('mongoose');
const dotnev = require('dotenv');
const app = require('./app');

dotnev.config({ path: './.env' });
const DB = process.env.DB.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB started'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
