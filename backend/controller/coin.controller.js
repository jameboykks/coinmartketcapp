const db = require('../config/db.config.js');
const Coin = db.coins;
 
// Post a coin
exports.create = (req, res) => {  
  // Save to MySQL database
  let coin = req.body;
  Coin.create(coin).then(result => {    
    // Send created coin to client
    res.json(result);
  });
};
 
// Fetch all coins
exports.findAll = (req, res) => {
  Coin.findAll().then(coins => {
    // Send all coins to Client
    res.json(coins);
  });
};
 
// Find a coin by Id
exports.findById = (req, res) => {  
  Coin.findById(req.params.coinId).then(coin => {
    res.json(coin);
  })
};
 
// Update a coin
exports.update = (req, res) => {
  let coin = req.body;
  let id = req.body.id;
  Coin.update(coin, 
           { where: {id: id} }
           ).then(() => {
             res.status(200).json({msg:"updated successfully a coin with id = " + id});
           });  
};
 
// Delete a coin by Id
exports.delete = (req, res) => {
  const id = req.params.coinId;
  Coin.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).json({msg:'deleted successfully a coin with id = ' + id});
  });
};