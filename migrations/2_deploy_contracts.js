var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var PlantBase = artifacts.require("./PlantBase.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PlantBase);
};
