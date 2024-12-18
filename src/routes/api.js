const express = require('express');
const router = express.Router();

// Add your routes here
router.get('/test', (req, res) => {
  res.json({ message: "API Working!" });
});

module.exports = router;
