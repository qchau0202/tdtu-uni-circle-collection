const app = require('./app');
const config = require('./config');

const PORT = config.port || 3006;

app.listen(PORT, () => {
  console.log(`Collection Service running on port ${PORT}`);
  console.log(`Environment: ${config.env}`);
});
