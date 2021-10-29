const Migrations = artifacts.require("Migrations");
const WhatIs = artifacts.require("WhatIs");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(WhatIs);
};
