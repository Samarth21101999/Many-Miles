const multer = require('multer');

const storage = multer.memoryStorage(); // for in-memory file buffers
const upload = multer({ storage });

module.exports = upload;