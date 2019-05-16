module.exports = function(app) {
 
    const coins = require('../controller/coin.controller.js');
 
    // Create a new coin
    app.post('/api/coins', coins.create);
 
    // Retrieve all coin
    app.get('/api/coins', coins.findAll);
 
    // Retrieve a single coin by Id
    app.get('/api/coins/:coinId', coins.findById);
 
    // Update a coin with Id
    app.put('/api/coins', coins.update);
 
    // Delete a coin with Id
    app.delete('/api/coins/:coinId', coins.delete);
}