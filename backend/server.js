var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
//create port client
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
 
app.use(cors(corsOptions))
 
const db = require('./config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: false }');
  
});
 
require('./route/coin.route.js')(app);

const rp = require('request-promise');
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '4',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'a24372a4-208d-42e9-9cae-9b5936b14a88'
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  console.log('API call response:', response);

  
const Coin = db.coins;
const data = response['data'];

for( let i = 0 ; i < data.length ; i++)
{
    let coin = 
    {
      coinId: data[i]['id'],
      name: data[i]['name'],
      symbol: data[i]['symbol'],
      circulating_supply: data[i]['circulating_supply'],
    }
    Coin.create(coin)
}
}).catch((err) => {
  console.log('API call error:', err.message);
});
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
})
 


