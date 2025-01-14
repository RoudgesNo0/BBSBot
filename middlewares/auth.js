// Soon..
module.exports = (req, res, next) => {
    const isAuthenticated = true; 
    if (isAuthenticated) {
        req.user = { id: 1, name: 'John Doe' }; // Beispielbenutzer
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};
