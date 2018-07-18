
const arcJs = require('@daostack/arc.js');


/**
 * @function  [createDao]
 * @returns {String} Status
 */
const createDao = async function (params) {
  await arcJs.InitializeArcJs({
    "useNetworkDefaultsFor": "ganache"
    });
  var founders_ = require(params.foundersFilePath);
  var schemes_ = await getSchemesArray(params.schemes);
  const newDao = await arcJs.DAO.new({
  name: params.daoName,
  tokenName: params.tokenName,
  tokenSymbol: params.tokenSymbol,
  founders:founders_.founders["ganache"],
  votingMachineParams: {
    votingMachineName: "GenesisProtocol"
  },
  schemes:schemes_
});
 console.log(newDao.avatar.address);
};

const getSchemesArray = async function (schemes) {
    var schemesArray = [];
    for (var i= 0;i<schemes.length;i++) {
      schemesArray[i] = {name:schemes[i]};
    }
    return schemesArray;
}

/**
 * @function  [contributionRewardpropose]
 * @returns {String} Status
 */
const contributionRewardPropose = async function (params) {
  await arcJs.InitializeArcJs({
    "useNetworkDefaultsFor": "ganache"
    });
  const dao = await arcJs.DAO.at(params.avatarAddress);
  const contributionReward = await dao.getSchemes("ContributionReward");
  if (contributionReward.length == 0) {
    console.log("contribution reward scheme not found");
    return;
  }
  console.log(contributionReward);
  const result = await contributionReward[0].wrapper.proposeContributionReward(Object.assign({
    avatar: dao.avatar.address,
    beneficiaryAddress: dao.avatar.address,
    description: "A new contribution",
    numberOfPeriods: 1,
    periodLength: 1,
    reputationChange:1,
    nativeTokenReward:0,
    ethReward:0,
    externalTokenReward:0
  }));
  console.log(result);
};

//Export all methods
module.exports = {
  createDao,
  contributionRewardPropose
};
