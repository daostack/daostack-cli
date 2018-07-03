
const arcJs = require('@daostack/arc.js');


/**
 * @function  [createDao]
 * @returns {String} Status
 */
const createDao = async function (params) {
  console.log(params);
  await arcJs.InitializeArcJs({
    "useNetworkDefaultsFor": "ganache"
    });
  var founders_ = require(params.foundersFilePath);
  const newDao = await arcJs.DAO.new({
  name: params.daoName,
  tokenName: params.tokenName,
  tokenSymbol: params.tokenSymbol,
  founders:founders_.founders["ganache"]
});
};

// Export all methods
module.exports = {
  createDao
};
