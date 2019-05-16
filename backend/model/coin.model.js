module.exports = (sequelize, Sequelize) => {
    const Coin = sequelize.define('coin', {
      coinId: {
      type: Sequelize.STRING
      },
      name: {
      type: Sequelize.STRING
      },
      symbol: {
      type: Sequelize.STRING
      },
      circulating_supply: {
          type:Sequelize.DOUBLE
      }
    });
    
    return Coin;
  }