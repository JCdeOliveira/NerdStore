function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        // Erreur d'authentification JWT
        return res.status(401).json({ message: 'The user is not authorized.' });
    }

    if (err.name === 'ValidationError') {
        // Erreur de validation
        return res.status(401).json({ message: err });
    }
    // Autres erreurs serveur
    return res.status(500).json(err);
}

module.exports = errorHandler;
