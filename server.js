const express = require('express');
const app = express();
const path = require('path');

// Serve everything inside /public
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
