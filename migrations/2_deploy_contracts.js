var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var GenericTrust = artifacts.require("./GenericTrust.sol");

module.exports = function(deployer) {

  const trustor = '0x413c5d52ad3c7c86004e960c3eb2b01706ea4140';
  const beneficiary = '0x1da1bc9a5ec7355670cce76ae26b120f5456b99d';
  const revocable = true;
  const deceasedPulseTriggerEnabled = true;
  const deceasedPulseTriggerRate = 61; // seconds
  const deceasedConfirmerTriggerEnabled = false;
  const numRequiredDeathConfirmations = 0;
  const fixedDateTriggerEnabled = false;
  const fixedDate = 0;
  const piggyBankTriggerEnabled = false;
  const piggyBankTriggerAmount = 0;

  deployer.deploy(SimpleStorage);
  deployer.deploy(GenericTrust,
                  trustor,
                  beneficiary,
                  revocable,
                  deceasedPulseTriggerEnabled,
                  deceasedPulseTriggerRate,
                  deceasedConfirmerTriggerEnabled,
                  numRequiredDeathConfirmations,
                  fixedDateTriggerEnabled,
                  fixedDate,
                  piggyBankTriggerEnabled,
                  piggyBankTriggerAmount);
};
