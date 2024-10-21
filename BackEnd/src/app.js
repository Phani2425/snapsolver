const express = require('express');
const cors = require('cors');
const calculatorRouter = require('./routes/calculator');
const { SERVER_URL, PORT, ENV } = require('./config/constants');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

app.use('/calculate', calculatorRouter);

app.listen(PORT, SERVER_URL, () => {
  console.log(`Server running on http://${SERVER_URL}:${PORT}`);
});

if (ENV === 'dev') {
  // Enable hot reloading for development
  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');
  
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(__dirname);
  app.use(connectLivereload());
}