const express = require('express');
const path = require('path');
const compression = require('compression');
const zlib = require('node:zlib');
// App and preferences
const version = '0.0.1';
const port = 8020;
const app = express();
// Log
console.log(`${(new Date()).toISOString()} | HomeMap v${version} | Starting server and proxy`);
// Ensure responses are compressed through this midleware
app.use(compression({
  level: zlib.constants.Z_BEST_COMPRESSION,
}));
// url definitions
app.use('/assets', express.static(path.join(__dirname, '../../assets'), { // Serve static files
  maxAge: '864000000' // 10 days caching for app assets
}));
// Serve main html at /
app.get('/', (req, res) => {
  console.log(`${(new Date()).toISOString()} | HomeMap v${version} | index.html page requested`);
  res.sendFile(path.join(__dirname, '../../index.html'));  
});

// Start server console
app.listen(port, () => {
  console.log(`${(new Date()).toISOString()} | HomeMap v${version} | Server started and listening on port ${port}`);
});
