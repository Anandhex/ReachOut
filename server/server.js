const dotnev = require('dotenv');
const app = require('./app.js');

dotnev.config({ path: './config.env' });
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
