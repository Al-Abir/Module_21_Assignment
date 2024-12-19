const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['token']; // Token header

    if (!token) {
        return res.status(401).json({ status: "Unauthorized", message: "No token provided" });
    }

    jwt.verify(token, "abir123", (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "Unauthorized", message: "Invalid token" });
        }

        // Store user information from the decoded token
        req.user = {
            FirstName: decoded.data.FirstName,
            NID: decoded.data.NID,
        };

        next();
    });
};
