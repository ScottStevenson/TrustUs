var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var GenericTrust = artifacts.require("./GenericTrust.sol");

module.exports = function(deployer) {

  const trustor = '0xaf59127c395d71af0736ec48a0bc1eadc704a460';
  const beneficiary = '0x2126e2b0939e0b0b2623d1d30d5cd3e3dead1869';
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
