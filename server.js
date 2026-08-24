import express from 'express';

const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static('.'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
